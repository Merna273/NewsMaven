#!/usr/bin/env python
# coding: utf-8

# In[1]:


from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field
from generate import *
from retrieval_grader import *
from refinement import *
from retrieve import *
from database import *
from database import CustomSparseEmbedding



# In[2]:


class GradeHallucinations(BaseModel):
    """Binary score for hallucination present in generation answer."""

    binary_score: str = Field(
        description="Answer is grounded in the facts, 'yes' or 'no'"
    )


# LLM with function call
llm = azure_model
structured_llm_grader = llm.with_structured_output(GradeHallucinations)

# Prompt
system = """You are a grader assessing whether an LLM generation is grounded in / supported by a set of retrieved facts. \n
     Give a binary score 'yes' or 'no'. 'Yes' means that the answer is grounded in / supported by the set of facts."""
hallucination_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system),
        ("human", "Set of facts: \n\n {documents} \n\n LLM generation: {generation}"),
    ]
)

hallucination_grader = hallucination_prompt | structured_llm_grader


# In[ ]:


def hallucination_grader_node(state):
    # Check if 'context' exists in the state and is hashable
    documents = state.get("context")
    if not documents:
        print("No documents in context. Skipping hallucination grading.")
        state["hallucination_grade"] = "No context available for grading."
        state["generated_response_eval"] = "No generation available for grading."
        return state

    # Check if 'generated_response' exists in the state and is hashable
    generation = state.get("generated_response")
    if not generation:
        print("No generated response found. Skipping hallucination grading.")
        state["hallucination_grade"] = "No generation available for grading."
        state["generated_response_eval"] = "No generation available for grading."
        return state

    # Call the hallucination grader with available documents and generated response
    grading_result = hallucination_grader.invoke({"documents": documents, "generation": generation})
    
    # Convert grading result to a hashable type if necessary
    # Assuming grading_result.binary_score is hashable (e.g., a string or int)
    state["hallucination_grade"] = str(grading_result.binary_score)  # Ensure it's hashable
    state["generated_response_eval"] = str(generation)  # Ensure generation is stored as a hashable type (string)
    
    return state



# In[ ]:


def check_hallucination(state):
    print("---CHECK HALLUCINATION---")
    if state["hallucination_grade"] == "no":
        print("Hallucination detected. Transitioning to rewrite.")
        return "rewrite_generation_condition"  # Trigger rewriting if hallucination detected
    return "END"


# In[ ]:


def rewrite_generation_condition(state):
    print("in rewrite generation condition")
    max_retries = state.get("max_retries_2", 0) + 1
    state["max_retries_2"] = max_retries
    
    if max_retries < 5:
        print("Max retries have not exceeded the limit. Transitioning to rewrite.")
        return {"action": "rewrite2", "max_retries_2": max_retries}  # Return state update
    else:
        print("Max retries have exceeded the limit. Transitioning to generate.")
        return {"action": "END", "max_retries_2": max_retries}  # Return state update


# In[ ]:


def rewrite2(state):
    print("---REWRITE 2 QUERY---")
    messages = state.get("messages", [])
    question = messages[0].content if messages else "No question provided"

    msg = [
        HumanMessage(
            content=f""" \n 
    Look at the input and try to reason about the underlying semantic intent / meaning. \n 
    Here is the initial question:
    \n ------- \n
    {question} 
    \n ------- \n
    Formulate an improved question: """,
        )
    ]

    # Invoke model to get rewrite suggestion
    model = azure_model
    response = model.invoke(msg)
    
    # Initialize or increment retry count
    state["max_retries_2"] = state.get("max_retries_2", 0) + 1
    print("Max_retries_2 is", state["max_retries_2"], "\n")
    
    # Return updated state with new messages
    state["messages"].append(response)
    return state

