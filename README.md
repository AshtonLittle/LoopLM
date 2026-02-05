# LoopLM: Infinite Context via Recursive LMs
LoopLM is an open-source implementation of Recursive Language Model (RLM) architecture. By treating massive text files as external variables rather than prompts, this system bypasses context rot found in traditional LLMS, allowing for high-accuracy analysis of 1M+ token documents.

## Scientific Foundation & Attribution
This project is a functional implementation of the research conducted by MIT CSAIL.
- Research Paper: "Recursive Language Models: Solving the Context Window Problem" (2025/2026)
- Core Concept: Instead of cramming data into a context window, a model is instead given a programmatic environment. It writes and executes Python code to recursively explore, slice, and analyze data in small, high-fidelity chunks.
- Shifting from attention mechanisms to inference-time computation and programmatic searching.

## How it works
LoopLM uses a Recursive Programmatic Search:
1. The document is loaded as a string variable 'C' within a Python sandbox.
2. The LLM generates Python code to locate relevant slices of text based on the query.
3. If relevant segments are found, but still too large for proper attention, the model calls rlm_query().
    - This spawns a sub-agent with a smaller slice of content.
4. Results from all recursive branches are returned to the primary agent and finally output.

## How to Use

### Setup
1. Clone this repository
2. Install dependencies: `pip install openai python-dotenv`
3. Copy `.env.template` to `.env` and configure your LLM provider:
   ```
   LLM_BASE_URL=http://localhost:11434/v1    # or your provider's endpoint
   API_KEY=your_api_key_here                  # leave empty for Ollama
   LLM_MODEL=qwen2.5-coder:7b                 # your model name
   ```

### Configuration
LoopLM supports any OpenAI-compatible API:
- **Ollama** (local): `http://localhost:11434/v1`
- **GitHub Models**: `https://models.inference.ai.azure.com`
- **Groq**: `https://api.groq.com/openai/v1`
- For using other providers, provide their endpoint.

### Running Analysis
```python
from rlm_engine import RLMEngine

# Initialize the engine
engine = RLMEngine(max_depth=5)

# Analyze a document
with open("your_document.txt", "r") as f:
    document = f.read()

result = engine.analyze("Your question here", document)
print(result)
```

### Best Practices
- Use clear, specific queries for better results
- Test with shorter documents first to understand the system
- Adjust `max_depth` based on document size and query complexity
- For best accuracy, use models with strong code generation capabilities