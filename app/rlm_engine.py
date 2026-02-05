import os
import re
import time
import connection

class RLMEngine:
    def __init__(self, max_depth=3):
        self.max_depth = max_depth
        self.client, self.model= connection.get_rlm_client()

    def analyze(self, query: str, document_text: str, depth=0) -> str:
        if depth > self.max_depth:
            return "Maximum analysis depth reached."
        
        if len(document_text) < 15000:
            return self._get_response(f"Analyze this snippet and answer the query: {query}\n\nSnippet: {document_text}", is_recursive_step=False)
        
        prompt = f"""
        YOU ARE A RECURSIVE NAVIGATOR (MAX DEPTH: {self.max_depth}).
        You are analyzing a document with {len(document_text)} characters stored in variable 'C'.

        GOAL: Answer the query: {query}

        STRATEGY:
        Write Python code to find the most relevant sections of 'C' to answer the query.
        If a section is found, use 'rlm_query(new_query, text_slice)' to analyze that section.

        AVAILABLE TOOLS:
        - len(C): get total length of document
        - C[start:end]: slice document text
        - re.finditer(pattern, C): find keyword locations.
        - rlm_query(querym context): recursive call to another agent.

        MANDATORY OUTPUT FORMAT:
        Your response must contain a ```python block.
        The final result must be assigned to a variable named 'final_result'.
        """

        raw_response = self._get_response(prompt, is_recursive_step=True)
        return self._execute_sandbox(raw_response, document_text, query, depth)
    
    def _get_response(self, prompt, is_recursive_step) -> str:
        try:
            if is_recursive_step:
                time.sleep(0.25)

            try:
                response = self.client.chat.completions.create(
                    messages=[{"role": "user", "content": prompt}],
                    model=self.model,
                    temperature=0.1,
                )
            except Exception as e:
                if "Unsupported value: 'temperature'" in str(e):
                    response = self.client.chat.completions.create(
                        messages=[{"role": "user", "content": prompt}],
                        model=self.model,
                        temperature=1
                    )
            return response.choices[0].message.content
        except Exception as e:
            raise RuntimeError(f"API Error: {e}")
        
    def _execute_sandbox(self, model_output: str, context: str, query: str, depth: int) -> str:
        code_match = re.search(r"```python(.*?)```", model_output, re.S)
        if not code_match:
            return "No executable code found in the model output."
        
        code = code_match.group(1)

        local_env = {
            "C": context,
            "re": re,
            "rlm_query": lambda q, ctx: self.analyze(q, ctx, depth + 1),
            "final_result": None
        }

        exec(code, local_env, local_env)
        return local_env.get("final_result", "No final_result found.")
