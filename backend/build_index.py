import json
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

# Load data
with open("data/faq.json", "r") as f:
    data = json.load(f)

questions = [item["question"] for item in data]

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Convert to embeddings
embeddings = model.encode(questions)

# Convert to numpy
embeddings = np.array(embeddings).astype("float32")

# Create FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)

# Add embeddings
index.add(embeddings)

# Save index
faiss.write_index(index, "data/faiss.index")

# Save metadata
with open("data/metadata.json", "w") as f:
    json.dump(data, f)

print("✅ FAISS index created!")