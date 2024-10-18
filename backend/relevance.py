from dotenv import load_dotenv
import os
import requests
import time

load_dotenv()

BASE_URL = f"https://api-{os.getenv("RELEVANCE_AI_REGION")}.stack.tryrelevance.com/latest"
HEADERS = { "Authorization": os.getenv("RELEVANCE_AI_AUTH_TOKEN") }
POLL_SECONDS = 15

def generate_landing_page(product_url: str, customer_url: str) -> str:
    trigger_response = requests.post(
        BASE_URL + "/agents/trigger", 
        headers=HEADERS, 
        json={
            "message": {
                "role": "user",
                "content": f"""
                    {
                        "customer_website": "{customer_url}",
                        "product_website": "{product_url}",
                    }
                """,
            },
            "agent_id": os.getenv("RELEVANCE_AI_AGENT_ID"),
        }
    )

    job = trigger_response.json()
    studio_id = job["job_info"]["studio_id"]
    job_id = job["job_info"]["job_id"]
    print(job)

    done = False
    status = None
    while not done:
        response = requests.get(
            BASE_URL + f"/studios/{studio_id}/async_poll/{job_id}", 
            headers=HEADERS
        )

        status = response.json()

        for update in status['updates']:
            if update['type'] == "chain-success":
                done = True

        if done:
            break

        print("waiting for agent response...")
        time.sleep(POLL_SECONDS) 

    return status

if __name__ == "__main__":
    product_url = input("Product URL: ")
    customer_url = input("Customer URL: ")
    resp = generate_landing_page(product_url, customer_url)
    print(resp)