from flask import Flask, request
import relevance

app = Flask(__name__)

@app.route("/generate_landing_page", methods=["POST"])
def generate_landing_page():
    return relevance.perform_ai_magic(request.form["product_website"], request.form["customer_website"])