import pandas as pd
import json

# Load dataset
df = pd.read_csv("data/Bitext_Sample_Customer_Support_Training_Dataset_27K_responses-v11.csv")

# 🔥 Update if column names differ
QUESTION_COL = "instruction"
ANSWER_COL = "response"

# Clean data
df = df.dropna(subset=[QUESTION_COL, ANSWER_COL])
df = df.drop_duplicates()

# Limit for CPU performance (IMPORTANT)
df = df.head(5000)

faq_data = []

for _, row in df.iterrows():
    question = str(row[QUESTION_COL]).strip().lower()
    answer = str(row[ANSWER_COL]).strip()

    if question and answer:
        faq_data.append({
            "question": question,
            "answer": answer
        })

# Save JSON
with open("backend/data/faq.json", "w") as f:
    json.dump(faq_data, f, indent=2)

print(f"✅ Created {len(faq_data)} QA pairs")