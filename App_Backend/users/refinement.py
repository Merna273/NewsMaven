#!/usr/bin/env python
# coding: utf-8

# In[1]:
from .generate import *
from .retrieval_grader import *
from .retrieve_org import *
from .hallucination_grader import *
from .database_org import *
from .database_org import CustomSparseEmbedding
# from NewsMaven_Backend.users.database_org import *
# from NewsMaven_Backend.users.database_org import CustomSparseEmbedding



from sentence_transformers import CrossEncoder


# In[2]:


def select_relevants(strips, query, cross_encoder, top_n):
    input_pairs = [(query, p) for p in strips if len(p.split()) >= 4]
    scores = cross_encoder.predict(input_pairs)
    
    strips_data = [(score, p, i) for i, (score, p) in enumerate(zip(scores, strips))]
    sorted_results = sorted(strips_data, key=lambda x: x[0], reverse=True)
    ctxs = [s[1] for s in sorted_results[:top_n]]
    idxs = [str(s[2]) for s in sorted_results[:top_n]]
    
    return '; '.join(ctxs), ', '.join(idxs)


# In[3]:


def extract_strips_from_psg(psg, num_concatenate_strips=3):
    """Decompose the passage into smaller strips for refinement."""
    # print("--- Extracting Strips ---")
    question_strips = psg.split('?')
    origin_strips = []
    for qs in question_strips:
        origin_strips += qs.split('. ')
    
    strips = []
    for s in origin_strips:
        s = s.strip()
        if s in strips or len(s) == 0:
            continue
        
        if len(s.split()) > 5:
            strips.append(s)
        else:
            # Ensure strips is not empty before modifying the last element
            if strips:
                strips[-1] += ' ' + s
            else:
                strips.append(s)

    # Combine strips into chunks
    final_strips = []
    buf = []
    for strip in strips:
        buf.append(strip)
        if len(buf) == num_concatenate_strips:
            final_strips.append(' '.join(buf))
            buf = []
    if buf:
        final_strips.append(' '.join(buf))

    return final_strips


# In[4]:


def knowledge_refinement(psgs, queries, model_name, device):
    """
    Perform knowledge refinement on retrieved passages based on queries using the given model.
    """
    top_n = 6  # Number of top relevant strips to select

    query = queries[0]
   
    strips = extract_strips_from_psg(' '.join(psgs))

    if not strips:
        # print("No strips extracted.")
        return ["No relevant information found."], []

    
    cross_encoder = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
    # Select relevant strips based on the query
    results, idxs = select_relevants(
        strips=strips,
        query=query,
        cross_encoder=cross_encoder,
        top_n=top_n,
    )
    
    # Clean up the results
    results = results.replace('\n', ' ') if results else "No relevant information found."
   
    
    return [results], idxs


# In[ ]:


def refinement_node(state):
    """
    Refines retrieved passages based on a query using a specified model.
    """
    # print("--- REFINEMENT NODE ---")
    messages = state.get("messages", [])
    
    # Retrieve the question and retrieved documents
    query = messages[0].content
    retrieved_passages = state.get("retrieved_documents", [])
   
    if not retrieved_passages:
        # print("No retrieved passages found for refinement.")
        return state
    
    # Define model and device parameters
    model_name = state.get('model_name', 'google/flan-t5-xl')
    device = state.get('device', 'cuda' if torch.cuda.is_available() else 'cpu')
    human_messages = [msg.content for msg in messages if isinstance(msg, HumanMessage)]
    if not human_messages:
        raise ValueError("No HumanMessage objects found in the state.")

    
    # get last message
    last_message = human_messages[-1]

    # print("Refining based on Query:", last_message)
    
    # Refine the retrieved passages
    refined_results, document_indexes = knowledge_refinement(
        retrieved_passages,
        [query],
        model_name=model_name,
        device=device
    )

    # Convert refined results into JSON format
    refined_message_content = json.dumps({
        "refined_results": refined_results,
        "document_indexes": document_indexes
    })
    # state["refined_results"] = refined_results
    
    # print("Refinement Output:", refined_message_content)
    #check if
    for message in messages:
        if getattr(message, 'sender', None) == "refinement_node" and getattr(message, 'type', None) == "Assistant":
            # print("Refinement message already exists in state.")
            #replace the existing message
            message.content = refined_message_content
            return state
        
    
    # Append refined results to `messages`
    refined_message = BaseMessage(
        type="Assistant",
        content=refined_message_content,
        sender="refinement_node",
    )
    # print(type(refined_message))
    state["messages"].append(refined_message)
    
    return state

