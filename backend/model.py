import json
import faiss
import numpy as np
import torch
from sentence_transformers import SentenceTransformer


class ChatbotModel:
    def __init__(self):
        # Load model
        self.model = SentenceTransformer('all-MiniLM-L6-v2', device='cpu')

        # Load FAISS index
        self.index = faiss.read_index("data/faiss.index")

        # Load metadata
        with open("data/metadata.json", "r") as f:
            self.data = json.load(f)

    def get_response(self, user_input):
        # Encode user query
        with torch.no_grad():
            query_embedding = self.model.encode([user_input])

        query_embedding = np.array(query_embedding).astype("float32")

        # Search FAISS
        distances, indices = self.index.search(query_embedding, k=1)

        best_idx = indices[0][0]
        score = float(distances[0][0])

        # Convert distance → similarity (important)
        confidence = 1 / (1 + score)

        if confidence < 0.5:
            return "Sorry, I couldn't understand your query.", confidence

        return self.data[best_idx]["answer"], confidence