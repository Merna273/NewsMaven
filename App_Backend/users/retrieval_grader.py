#!/usr/bin/env python
# coding: utf-8

# In[1]:


from typing import Literal
from pydantic import BaseModel, Field
from langchain_core.prompts import PromptTemplate
from .generate import *
from .refinement import *
from .retrieve_org import *
from .hallucination_grader import *
from .database_org import *
from .database_org import CustomSparseEmbedding
# from NewsMaven_Backend.users.database_org import *
# from NewsMaven_Backend.users.database_org import CustomSparseEmbedding


# In[ ]:


def grade_documents(state) -> Literal["relevant", "irrelevant"]:
    # print("---CHECK RELEVANCE---")
    # print("here")

    # Data model for structured output
    class Grade(BaseModel):
        binary_score: str = Field(description="Relevance score 'yes' or 'no'")

    # LLM model setup
    model = azure_model
    llm_with_tool = model.with_structured_output(Grade)

    # Prompt template
    prompt = PromptTemplate(
        template="""You are a grader assessing relevance of a retrieved document to a user question. \n
        Here is the retrieved document: \n\n {context} \n\n
        Here is the user question: {question} \n
        If the document contains keyword(s) or semantic meaning related to the user question, grade it as relevant. \n
        Give a binary score 'yes' or 'no' score to indicate whether the document is relevant to the question.""",
        input_variables=["context", "question"],
    )
    chain = prompt | llm_with_tool

    # Set context and question based on state
    if state.get("in_ref") == "True":
        context = state.get("refined_results")
        question = state.get("query")
        # print("questionnnnnnnnnnnnnnnnnnn ", question)
        # print("REFINEMENT IN PROGRESS")
        state["in_ref"] = "False"
    else:
        # Fallback if "in_ref" is not "True"
        messages = state.get("messages", [])
        question = messages[0].content if messages else None
        context = messages[-1].content if messages else None

    # Check if question and context are defined
    if not question:
        raise ValueError("Either 'question' or 'context' is missing from the state.")
    if not context:
        context= ""

    # Invoke the grading model
    scored_result = chain.invoke({"question": question, "context": context})
    score = scored_result.binary_score

    if score == "yes":
        # print("---DECISION: DOCS RELEVANT---")
        return "relevant"  
    else:
        # print("---DECISION: DOCS NOT RELEVANT---")
        # print(score)
        return "irrelevant"  



# In[1]:


def rewrite_condition(state):
    max_retries = state.get("max_retries_1", 0) + 1
    state["max_retries_1"] = max_retries
    
    if max_retries < 5:
        # print("max_retries_1", max_retries)
        return {"action": "rewrite", "max_retries_1": max_retries}  # Return state update
    else:
        # print("Max retries have exceeded the limit. Transitioning to generate.")
        return {"action": "generate", "max_retries_1": max_retries}  # Return state update


# In[ ]:


def rewrite(state):

    # print("---REWRITE QUERY---")
    messages = state["messages"]
    question = messages[0].content

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

    # Grader
    model=azure_model
    response = model.invoke(msg)
    state["max_retries_1"] = state["max_retries_1"] + 1

    # print("Max_retries_1 is", state["max_retries_1"] ,"\n")
    
    # return {"messages": [response]}
    return state

