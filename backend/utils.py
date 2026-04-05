from datetime import datetime


def log_chat(user_msg, bot_msg, score):
    with open("./logs/chat.log", "a") as f:
        f.write(
            f"{datetime.now()} | User: {user_msg} | Bot: {bot_msg} | Score: {score}\n"
        )