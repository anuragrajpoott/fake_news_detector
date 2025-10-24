import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.model_selection import train_test_split
import joblib
import os
import re

print("Starting model training script...")

# --- IMPORTANT ---
# Make sure your CSV files have a column named 'text'.
# If not, change 'text' in the code below to your column's name.
TEXT_COLUMN_NAME = 'text'

# Step 1: Load the datasets
try:
    fake_df = pd.read_csv("Fake (2).csv")
    real_df = pd.read_csv("True (2).csv")
    print("Successfully loaded fake.csv and real.csv")
except FileNotFoundError:
    print("Error: fake.csv or real.csv not found.")
    print("Please make sure they are in the 'ml-service' folder.")
    exit()
except Exception as e:
    print(f"Error loading CSVs: {e}")
    print(f"Please check that your CSV files have a '{TEXT_COLUMN_NAME}' column.")
    exit()

# Step 2: Add labels
fake_df['label'] = 'FAKE'
real_df['label'] = 'REAL'
print("Added 'label' column to dataframes.")

# Step 3: Combine the datasets
# We use ignore_index=True to reset the index
df = pd.concat([fake_df, real_df], ignore_index=True)

# Step 4: Clean and preprocess the data
# Dropping any rows that might be missing text
df = df.dropna(subset=[TEXT_COLUMN_NAME])
# Simple text cleaning function (optional, but recommended)
def clean_text(text):
    text = text.lower()
    text = re.sub(r'\[.*?\]', '', text) # remove text in square brackets
    text = re.sub(r'\W', ' ', text)     # remove special chars
    text = re.sub(r'httpsS?://\S+|www\.\S+', '', text) # remove URLs
    text = re.sub(r'<.*?>+', '', text)  # remove HTML tags
    text = re.sub(r'\n', '', text)      # remove newlines
    return text

print("Cleaning text data...")
df[TEXT_COLUMN_NAME] = df[TEXT_COLUMN_NAME].apply(clean_text)

# Step 5: Define features (X) and labels (y)
X = df[TEXT_COLUMN_NAME]
y = df['label']

# Step 6: Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"Data split into {len(X_train)} training samples and {len(X_test)} testing samples.")

# Step 7: Initialize and fit the TF-IDF Vectorizer
# This converts all text into numerical features
tfidf_vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7)
tfidf_train = tfidf_vectorizer.fit_transform(X_train)
print("TF-IDF Vectorizer created and fitted to training data.")

# Step 8: Initialize and train the classifier
# PassiveAggressiveClassifier is fast and good for text
pac = PassiveAggressiveClassifier(max_iter=50)
pac.fit(tfidf_train, y_train)
print("Model (PassiveAggressiveClassifier) trained.")

# Step 9: Save the model and the vectorizer to disk
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
vectorizer_path = os.path.join(os.path.dirname(__file__), 'vectorizer.pkl')

joblib.dump(pac, model_path)
joblib.dump(tfidf_vectorizer, vectorizer_path)

print(f"\nTraining complete!")
print(f"Model saved to: {model_path}")
print(f"Vectorizer saved to: {vectorizer_path}")

