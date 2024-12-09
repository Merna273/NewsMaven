#!/usr/bin/env python
# coding: utf-8


import os
import json
from typing import Annotated, Literal, Sequence, List, Dict
from typing_extensions import TypedDict
from langchain import hub
from langchain_core.messages import BaseMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from pydantic import BaseModel, Field

from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain_openai.chat_models import AzureChatOpenAI
from langchain_openai.embeddings import AzureOpenAIEmbeddings

from langgraph.prebuilt import tools_condition
from llama_index.core.settings import Settings
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from llama_index.core import Document
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType, list_collections
from langchain_community.vectorstores import Milvus
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.schema import Document
from pymilvus.model.hybrid import MGTEEmbeddingFunction, BGEM3EmbeddingFunction
from langchain_milvus.utils.sparse import BaseSparseEmbedding
import numpy as np
import torch


# os.environ['OPENAI_API_KEY']
os.environ["AZURE_OPENAI_API_KEY"] = "5fa9e8a1631f4dc4bd6cc9bf6cb0cdcc"
os.environ["AZURE_OPENAI_ENDPOINT"] = "https://newsaugsponsored.openai.azure.com/"


# In[4]:


# model_name = "BAAI/bge-base-en"
model_name = "BAAI/llm-embedder"

model_kwargs = {'device': 'cuda:0'}
encode_kwargs = {'normalize_embeddings': True}
hf = HuggingFaceBgeEmbeddings(
    model_name=model_name,
    model_kwargs=model_kwargs,
    encode_kwargs=encode_kwargs
)
# not working for manual embeddings

Settings.embed_model = HuggingFaceBgeEmbeddings(model_name="BAAI/llm-embedder")

azure_configs = {
    "api_key":"5fa9e8a1631f4dc4bd6cc9bf6cb0cdcc",
    "azure_endpoint": "https://newsaugsponsored.openai.azure.com/",
    "model_deployment": "gpt-4",
    "model_name": "gpt-4",
    "embedding_deployment": "embedding_model",
    "embedding_name": "text-embedding-ada-002",  # most likely
}
azure_model = AzureChatOpenAI(
    openai_api_version="2023-05-15",
    # base_url=azure_configs["azure_endpoint"],
    azure_deployment=azure_configs["model_deployment"],
    model=azure_configs["model_name"],
    validate_base_url=False,
)

Settings.llm = azure_model


# In[6]:


azure_embeddings = AzureOpenAIEmbeddings(
    openai_api_version="2023-05-15",
    azure_endpoint=azure_configs["azure_endpoint"],
    azure_deployment=azure_configs["embedding_deployment"],
    model=azure_configs["embedding_name"],
)


bge_m3_ef = BGEM3EmbeddingFunction(model_name='BAAI/bge-m3', use_fp16=True, device="cuda:0")
dense_dim = bge_m3_ef.dim["dense"]
sparse_dim = bge_m3_ef.dim["sparse"]

connections.connect(host='localhost', port='19530')

#  Step 1: Define the fields for the collection schema
fields = [
    FieldSchema(name="document_id", dtype=DataType.VARCHAR, max_length=512, is_primary=True),
    FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),  # Specify max_length for strings
    FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=65535),  # Specify max_length for strings
    FieldSchema(name="sparse_vector", dtype=DataType.SPARSE_FLOAT_VECTOR),  # Sparse vector 
    FieldSchema(name="dense_vector", dtype=DataType.FLOAT_VECTOR, dim=dense_dim), # dense vector

]

schema = CollectionSchema(fields=fields, description="Collection for storing nodes vectors", enable_dynamic_field=False)

collection_name = "vector_documents"
collection = Collection(name=collection_name, schema=schema,consistency_level="Strong")
collection.load()
collection.flush()

class CustomSparseEmbedding(BaseSparseEmbedding):
    def __init__(self, model_name):
        self.embedding_function = MGTEEmbeddingFunction(model_name=model_name)

    def embed_documents(self, texts: List[str]) -> List[Dict[int, float]]:
        return [self.embedding_function.encode_documents([text])['sparse_embeddings'] for text in texts]


    def embed_query(self, query: str) -> Dict[int, float]:
        result = self.embedding_function.encode_queries(query)
        sparse_vector = result['sparse'] 
        coo = sparse_vector.tocoo()  
        sparse_dict = {int(i): float(v) for i, v in zip(coo.col, coo.data)}
        return sparse_dict
# GTE Sparse Embedding -- STOA
sparse_embedding_function=  CustomSparseEmbedding(model_name="Alibaba-NLP/gte-multilingual-base")

torch.cuda.empty_cache()
collection.load()


