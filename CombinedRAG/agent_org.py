#!/usr/bin/env python
# coding: utf-8
from generate import *
from retrieval_grader import *
from refinement import *
from retrieve import *
from hallucination_grader import *
from database import *
from database import CustomSparseEmbedding


# In[1]:

# In[2]:


from typing import Annotated, Sequence
from typing_extensions import TypedDict
import torch

from langchain_core.messages import BaseMessage

from langgraph.graph.message import add_messages


from typing import Annotated, Sequence
from typing_extensions import TypedDict

from langchain_core.messages import BaseMessage

from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import END, StateGraph, START
from langgraph.prebuilt import ToolNode
from langchain_core.messages import AIMessage


# In[3]:


def agent(state):
    """
    Invokes the agent model to generate a response based on the current state. Given
    the question, it will decide t"5fa9e8a1631f4dc4bd6cc9bf6cb0cdcc",o retrieve using the retriever tool, or simply end.

    Args:
        state (messages): The current state

    Returns:
        dict: The updated state with the agent response appended to messages
    """
    print("---CALL AGENT---")
    messages = state["messages"]
    model = azure_model
    state["retrieved_documents"] =[]
    print(messages)
    messages = [message for message in messages if type(message) != BaseMessage]
  
    
   

    response = model.invoke(messages)


# In[4]:


class AgentState(TypedDicAzureNewsAugt):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    context:str
    generated_response:str
    generated_response_eval:str
    retrieved_documents: list
    max_retries_1: str
    max_retries_2: str


# In[5]:


# Define a new graph
workflow = StateGraph(AgentState)

# Add nodes
workflow.add_node("agent", agent)
workflow.add_node("retrieve", retrieve)
workflow.add_node("refinement", refinement_node)
workflow.add_node("rewrite", rewrite)
workflow.add_node("generate", generate)
workflow.add_node("hallucination_grader", hallucination_grader_node)
workflow.add_node("rewrite2", rewrite2)
workflow.add_node("rewrite_generation_condition", rewrite_generation_condition)
workflow.add_node("rewrite_condition", rewrite_condition)  # Ensure this node is added

# Initial edgesgenerated_response
workflow.add_edge(START, "agent")
workflow.add_edge("agent", "retrieve")
workflow.add_edge("retrieve", "refinement")
workflow.add_edge("rewrite", "retrieve")

# Conditional edge after refinement: proceed to generate or rewrite
workflow.add_conditional_edges(
    "refinement",
    grade_documents,  # Check if documents are relevant
    {
        "relevant": "generate",       # If relevant, proceed to generate
        "irrelevant": "rewrite_condition",  # If irrelevant, go to rewrite_condition
    },
)

# Conditional loop from rewrite_condition
workflow.add_conditional_edges(
    "rewrite_condition",
    lambda state: state["action"],  
    {
        "rewrite": "rewrite",
        "generate": "generate",
    },
)


# Final edges for generating the response
workflow.add_edge("generate", "hallucination_grader")

# Conditional logic after hallucination grading
workflow.add_conditional_edges(
    "hallucination_grader",
    check_hallucination,  # Check for hallucination
    {
        "rewrite_generation_condition": "rewrite_generation_condition",  # Rewrite if hallucination detected
        "END": END,  # Otherwise, end workflow
    },
)

# Conditional edges from rewrite_generation_condition
workflow.add_conditional_edges(
    "rewrite_generation_condition",
     lambda state: state["action"],
    {
        "rewrite2": "rewrite2",
        "END": END,
    },
)

workflow.add_edge("rewrite2", "generate")

# Compile the graph
memory = MemorySaver()
graph = workflow.compile(checkpointer=memory)


# In[6]:


from IPython.display import Image, display

try:
    display(Image(graph.get_graph(xray=True).draw_mermaid_png()))
except Exception:
    pass


# In[9]:


config = {"configurable": {"thread_id": "1"}}
inputs = {
    "messages": [
        ("user", "Who invaded Jibal and forced Mahmud II to cede Mazandaran?")
    ],
   
}
# inputs = {
#     "messages": [
#         ("user", "when did that happen")
#     ],
# }

import pprint

for output in graph.stream(inputs,config):
    
    for key, value in output.items():
        # Print the raw output from each node
        pprint.pprint(f"Output from node '{key}':")
        pprint.pprint(value, indent=2, width=80, depth=None)

