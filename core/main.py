import ollama
import json
import sqlite3
import requests

# -----------------------------
# ACTION REGISTRY
# -----------------------------
ACTIONS = {}

def register_action(name):
    """Decorator to register a new action"""
    def wrapper(func):
        ACTIONS[name] = func
        return func
    return wrapper

# -----------------------------
# EXAMPLE ACTIONS
# -----------------------------
@register_action("call_api")
def call_api(arguments):
    """Fetch data from a REST API"""
    endpoint = arguments.get("endpoint")
    resp = requests.get(endpoint)
    return resp.json()

@register_action("run_sql")
def run_sql(arguments):
    """Run a SQL query against SQLite"""
    query = arguments.get("query")
    conn = sqlite3.connect("mydb.sqlite")
    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    conn.commit()
    conn.close()
    return rows

@register_action("echo")
def echo(arguments):
    """Echo a string back (toy example)"""
    return {"echo": arguments.get("text", "")}

# -----------------------------
# OLLAMA LOOP
# -----------------------------
def ollama_step(prompt, model="qwen3:0.6b"):
    resp = ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )
    return resp["message"]["content"]

def run_pipeline(user_query, model="qwen3:0.6b"):
    context = ""
    while True:
        raw = ollama_step(
            f"""You are an agent. Follow this strict JSON schema:
{{
  "action": "<one of: {list(ACTIONS.keys())} or 'final'>",
  "arguments": {{ ... }}
}}

User asked: {user_query}
Context: {context}
"""
        )

        print("LLM output:", raw)

        try:
            step = json.loads(raw)
        except Exception as e:
            context = f"Error: invalid JSON ({e}). Try again."
            continue

        action = step.get("action")
        args = step.get("arguments", {})

        if action == "final":
            return step.get("arguments", {}).get("answer", "No final answer provided")

        if action in ACTIONS:
            try:
                result = ACTIONS[action](args)
                context = f"Result of {action}: {result}"
            except Exception as e:
                context = f"Error running {action}: {e}"
        else:
            context = f"Unknown action: {action}"

if __name__ == "__main__":
    # Prepare a tiny database for demo
    conn = sqlite3.connect("mydb.sqlite")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS weather(city TEXT, temp INT)")
    conn.commit()
    conn.close()

    answer = run_pipeline("Get Paris weather from API and save it in the database.")
    print("Final Answer:", answer)