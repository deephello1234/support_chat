# 🤖 AI Customer Support Chatbot

An AI-powered customer support chatbot built using React, Flask, Sentence-BERT, and FAISS for semantic search and intelligent response retrieval.

---

# 🚀 Features

- AI-powered semantic search chatbot
- Sentence-BERT NLP model
- FAISS vector similarity search
- React frontend chat interface
- Flask backend API
- Real customer support dataset integration
- CPU-optimized inference
- Confidence score responses
- Conversation logging
- Enter-to-send support
- Scalable retrieval system

---

# 🧠 Tech Stack

## Frontend
- React.js
- Axios
- CSS

## Backend
- Flask
- Flask-CORS
- Sentence-Transformers
- FAISS
- PyTorch

## AI / NLP
- Sentence-BERT (`all-MiniLM-L6-v2`)
- Semantic similarity search
- FAISS vector indexing

---

# 📁 Project Structure

```bash
ai_chatbot/
│
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── build_index.py
│   ├── prepare_data.py
│   ├── requirements.txt
│   ├── data/
│   │   └── faq.json
│
├── frontend-react/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone git@github.com-work:deephello1234/support_chat.git
cd support_chat
```

---

# 🐍 Backend Setup

## 2️⃣ Create Virtual Environment

### Linux / Mac

```bash
python3 -m venv myenv
source myenv/bin/activate
```

### Windows

```bash
python -m venv myenv
myenv\Scripts\activate
```

---

## 3️⃣ Install Backend Dependencies

```bash
pip install -r backend/requirements.txt
```

---

# 🤖 Build FAISS Index

Run:

```bash
python backend/build_index.py
```

This:
- Loads FAQ dataset
- Generates Sentence-BERT embeddings
- Creates FAISS vector index

---

# 🚀 Run Backend Server

```bash
python backend/app.py
```

Backend runs on:

```bash
http://127.0.0.1:5000
```

---

# ⚛️ Frontend Setup

## 4️⃣ Install Frontend Dependencies

```bash
cd frontend-react
npm install
```

---

# ▶️ Run React Frontend

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 💬 Chatbot Workflow

1. User enters query
2. Sentence-BERT converts query to embedding
3. FAISS performs semantic similarity search
4. Best matching response is returned
5. Confidence score displayed in UI

---

# 🧠 AI Model

The chatbot uses:

```python
all-MiniLM-L6-v2
```

This lightweight Sentence-BERT model enables:
- Semantic understanding
- Fast CPU inference
- Scalable retrieval

---

# 📊 Dataset

The chatbot was trained using:
- Customer support conversation datasets
- FAQ-style support responses

---

# 🔥 Example Queries

- Hi
- How can I track my order?
- Refund policy
- Cancel my subscription
- Payment failed

---

# 🌐 Future Improvements

- LLM integration
- Context-aware conversations
- User authentication
- Chat history persistence
- WhatsApp integration
- Deployment on cloud

---

# 🛠️ Troubleshooting

## FAISS Error

Install CPU version:

```bash
pip install faiss-cpu
```

---

## CORS Error

Install Flask-CORS:

```bash
pip install flask-cors
```

---

## Model Download Issue

Ensure internet connection for first run.

Sentence-BERT model downloads automatically.

---

# 📌 Git Commands

```bash
git add .
git commit -m "update project"
git push origin main
```

---

# 👨‍💻 Author

Deep Sen

---

# 📜 License

This project is for educational and internship purposes.
