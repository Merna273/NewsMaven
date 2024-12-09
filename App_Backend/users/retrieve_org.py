#!/usr/bin/env python
# coding: utf-8

# ## Define Hybrid Retriever
from .generate import *
from .retrieval_grader import *
from .refinement import *
from .hallucination_grader import *
from .database_org import *
from .database_org import CustomSparseEmbedding
#from NewsMaven_Backend.users.database_org import *
#from NewsMaven_Backend.users.database_org import CustomSparseEmbedding


# In[ ]:


from langchain_milvus.utils.sparse import BM25SparseEmbedding
from langchain_milvus.retrievers import MilvusCollectionHybridSearchRetriever
from langchain_community.embeddings import HuggingFaceEmbeddings
from pymilvus import WeightedRanker
# from NewsMaven_Backend.users.database_org import CustomSparseEmbedding
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType, list_collections

# In[ ]:

# Step 3: Create the collection
collection_name = "vector_documents"
collection = Collection(name=collection_name)

# Define the sparse and dense embedding fields
sparse_embedding_field = "sparse_vector"
dense_embedding_field = "dense_vector"

dense_embedding_func = HuggingFaceEmbeddings(model_name="BAAI/bge-m3")
sparse_embedding_func = CustomSparseEmbedding(model_name="Alibaba-NLP/gte-multilingual-base")

dense_search_params = {"metric_type": "IP", "params": {"nprobe": 10}, "output_fields": ["distance"]}
sparse_search_params = {"metric_type": "IP", "params": {"ef": 100}, "output_fields": ["distance"]}

from pymilvus import RRFRanker

rerank = RRFRanker()

# Create the hybrid retriever
retriever = MilvusCollectionHybridSearchRetriever(
    collection=collection,
    rerank=WeightedRanker(0.5, 0.5),  # Combine sparse and dense results with equal weight
    anns_fields=[dense_embedding_field, sparse_embedding_field],  # Dense and sparse vector fields
    field_embeddings=[dense_embedding_func, sparse_embedding_func],  # Embedding functions
    field_search_params=[dense_search_params, sparse_search_params],  # Search params for dense/sparse
    top_k=3,  # Retrieve top 3 results
    text_field="text",  # Text field for the documents
)


# In[ ]:


def retrieve(state):
    """
    Retrieves relevant documents based on the user question.
    """
    # print("---RETRIEVE---")
    messages = state["messages"]

    human_messages = [msg.content for msg in messages if isinstance(msg, HumanMessage)]
    if not human_messages:
        raise ValueError("No HumanMessage objects found in the state.")

    question = "\n".join(human_messages)  # Combine messages with newline for clarity
    # print("Combined Query:\n", question)
    retrieved_docs = retriever.invoke(question)
    
    # print("-- Retrieved Docs --")
    retrieved_pages = [doc.page_content for doc in retrieved_docs]
    # print("titles")
    # for doc in retrieved_docs:
    #     print(doc.metadata["title"])
    
    state["retrieved_documents"] = retrieved_pages
    state["messages"]
    # print("Updated State in Retrieve:", state)
    return state

