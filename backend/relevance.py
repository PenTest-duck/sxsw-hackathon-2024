from dotenv import load_dotenv
from bs4 import BeautifulSoup
import os
import requests
import time
import json
import uuid

load_dotenv()

BASE_URL = f"https://api-{os.getenv("RELEVANCE_AI_REGION")}.stack.tryrelevance.com/latest"
HEADERS = { "Authorization": os.getenv("RELEVANCE_AI_AUTH_TOKEN") }
POLL_SECONDS = 15

def perform_ai_magic(product_url: str, customer_url: str) -> str:
    img_urls = scrape_images(product_url)
    output = generate_landing_page(product_url, customer_url, img_urls)
    return store_to_file(output)

def scrape_images(product_url: str) -> list[str]:
    response = requests.get(product_url)
    parsed_img_urls = []
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img')
        
        img_urls = [img['src'] for img in img_tags if 'src' in img.attrs]
        img_urls = [url for url in img_urls if not url.startswith("data:")]

        for url in img_urls:
            parsed_url = url
            if url.startswith("//"):
                parsed_url = "https:" + url
            elif url.startswith("/"):
                parsed_url = product_url + url
            parsed_img_urls.append(parsed_url)
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")

    return parsed_img_urls

def generate_landing_page(product_url: str, customer_url: str, img_urls: list[str]) -> str:
    trigger_response = requests.post(
        BASE_URL + "/agents/trigger", 
        headers=HEADERS, 
        json={
            "message": {
                "role": "user",
                "content": f"""
                    {{
                        "customer_website": "{customer_url}",
                        "product_website": "{product_url}",
                        "img_urls": "{json.dumps(img_urls)}",
                    }}
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
                print(status)
                return r"{}".format(update["output"]["output"]["answer"]) # need to format as raw string for JSON parsing

        if done:
            break

        print("waiting for agent response...")
        time.sleep(POLL_SECONDS) 

def store_to_file(output: str) -> str:
    output_json = json.loads(output, strict=False)
    id = str(uuid.uuid4())

    dir = f"landing_pages/{output_json["name"]}/{id}" 
    os.makedirs(dir)

    with open(f"{dir}/index.html", "w+") as f:
        f.write(output_json["html"])
    with open(f"{dir}/style.css", "w+") as f:
        f.write(output_json["css"])

    return id



if __name__ == "__main__":
    product_url = input("Product URL: ")
    customer_url = input("Customer URL: ")
    img_urls = scrape_images(product_url)
    output = generate_landing_page(product_url, customer_url, img_urls)
    print(store_to_file(output))
