from sentence_transformers import SentenceTransformer, util
import json
import torch


class ChatbotModel:
    def __init__(self, path):
        with open(path, "r") as f:
            data = json.load(f)

        self.questions = [item["question"] for item in data]
        self.answers = [item["answer"] for item in data]

        # Force CPU usage
        self.device = "cpu"

        # Load lightweight model (best for CPU)
        self.model = SentenceTransformer('all-MiniLM-L6-v2', device=self.device)

        # Precompute embeddings (VERY IMPORTANT)
        with torch.no_grad():
            self.question_embeddings = self.model.encode(
                self.questions,
                convert_to_tensor=True,
                device=self.device
                )
    def get_response(self, user_input):
        user_input_lower = user_input.lower()

        # Greeting handling
        greetings = ["hi", "hello", "hey", "good morning", "good evening"]
        if any(greet in user_input_lower for greet in greetings):
            return "Hello! How can I help you today?", 1.0

        # Continue with BERT
        with torch.no_grad():
            user_embedding = self.model.encode(
                user_input, convert_to_tensor=True, device=self.device
            )

        similarities = util.cos_sim(user_embedding, self.question_embeddings)

        best_idx = torch.argmax(similarities)
        score = similarities[0][best_idx].item()

        # Strong threshold
        if score < 0.6:
            return "Sorry, I couldn't understand your query.", score

        return self.answers[best_idx], score