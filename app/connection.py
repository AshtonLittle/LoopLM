import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def get_rlm_client():
    base_url = os.getenv("LLM_BASE_URL")
    
    if not base_url:
        raise ValueError("LLM_BASE_URL must be set in environment variables.")
    
    # API_KEY is optional if using Ollama local server.
    api_key = os.getenv("API_KEY") or "ollama"
    
    client = OpenAI(base_url=base_url, api_key=api_key)
    model = os.getenv("LLM_MODEL", "gpt-4o")
    
    return client, model

