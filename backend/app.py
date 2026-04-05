from flask import Flask, request, jsonify
from model import ChatbotModel
from utils import log_chat
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


bot = ChatbotModel()


@app.route("/")
def home():
    return "AI Chatbot API Running"


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_msg = data.get("message", "")

    response, score = bot.get_response(user_msg)

    log_chat(user_msg, response, score)

    return jsonify({
        "response": response,
        "confidence": float(score)
    })


if __name__ == "__main__":
    app.run(debug=True)