from flask import Flask, request
import relevance

app = Flask(__name__)

@app.route("/generate_landing_page", methods=["POST"])
def generate_landing_page():
    data = request.get_json()
    return relevance.perform_ai_magic(data.get("product_website"), data.get("customer_website"))