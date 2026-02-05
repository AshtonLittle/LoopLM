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