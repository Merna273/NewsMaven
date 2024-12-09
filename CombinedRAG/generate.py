#!/usr/bin/env python
# coding: utf-8
from retrieval_grader import *
from refinement import *
from retrieve import *
from hallucination_grader import *
from database import *
from database import CustomSparseEmbedding


# In[ ]:


def generate(state):
    print("---GENERATE---")
    messages = state.get("messages", [])
    # question = messages[0].content if messages else None  # Extract user's question
    # Filter messages of type HumanMessage
    human_messages = [msg.content for msg in messages if isinstance(msg, HumanMessage)]
    if not human_messages:
        raise ValueError("No HumanMessage objects found in the state.")

    # Combine all human messages into a single query
    question = "\n".join(human_messages)  # Combine messages with newline for clarity
    print("Combined Query:\n", question)
    # get last message
    last_message = human_messages[-1]


    # Locate refined results from messages
    refined_results = None
    for message in messages:
        if getattr(message, 'sender', None) == "refinement_node" and getattr(message, 'type', None) == "Assistant":
            print("Found refined results message:", message)
            refined_results = json.loads(message.content).get("refined_results", [])
            state["context"] = refined_results
            print("Extracted refined results:", refined_results)
            break
    
        


    # Check if question and refined results are available
    if not question:
        raise ValueError("Question is missing in the state.")
    
    if not refined_results:
        print("No refined results in context. Returning default response.")
        state["generated_response"] = "No relevant documents were found."
        return state

    # Ensure context is properly set
    context = state.get("context", [])
    if not context:
        print("Context is missing even after extraction.")
        state["generated_response"] = "Context could not be established."
        return state

    # Format the context for the LLM input
    formatted_docs = "\n\n".join(context)

    # Define the prompt manually
    prompt = f"""You are an AI assistant. Answer the user's question based on the following context or from your previous knowledge.Answer Current question.

Context:
{formatted_docs}


Previous Questions: {question}

Last Generated Response: {state.get("generated_response_eval", "None")}


Current Question: {last_message}
Answer:"""
    
    print("Generated prompt:\n", prompt)

    # Generate the response using the LLM directly
    llm = azure_model
    try:
        response = llm(prompt)
        # Access the content attribute if response is an AIMessage object
        if hasattr(response, 'content'):
            state["generated_response"] = response.content.strip()
        else:
            state["generated_response"] = str(response).strip()
    except Exception as e:
        print("Error during LLM invocation:", e)
        state["generated_response"] = "Failed to generate a response."

    return state

