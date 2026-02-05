import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

def get_rlm_client():
    github_token = os.getenv("GITHUB_TOKEN")
    github_models_endpoint = os.getenv("GITHUB_MODELS_ENDPOINT")
    rlm_model = os.getenv("RLM_MODEL", "gpt-4o")

    if not github_token or not github_models_endpoint:
        raise ValueError("GITHUB_TOKEN and GITHUB_MODELS_ENDPOINT must be set in environment variables.")

    client = OpenAI(
        base_url=github_models_endpoint,
        api_key=github_token
    )
    return client, rlm_model

