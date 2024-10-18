from flask import Flask, jsonify, request
from flask_cors import CORS
import relevance

app = Flask(__name__)
CORS(app)

@app.route("/generate_landing_page", methods=["POST"])
def generate_landing_page():
    if request.method != "POST":
        return
    
    data = request.get_json()
    
    page_id = relevance.perform_ai_magic(data.get("product_website"), data.get("customer_website"))
    
    res = { "id": page_id }
    return jsonify(res)