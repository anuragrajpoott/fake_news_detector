import os
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# --- Load Model and Vectorizer ---
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), 'vectorizer.pkl')

model = None
vectorizer = None

print("Loading ML model and vectorizer...")
try:
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        model = joblib.load(MODEL_PATH)
        vectorizer = joblib.load(VECTORIZER_PATH)
        print("Model and vectorizer loaded successfully.")
    else:
        print("Error: model.pkl or vectorizer.pkl not found.")
        print("Please run the 'train_model.py' script first.")
except Exception as e:
    print(f"Error loading model files: {e}")
    model = None
    vectorizer = None

# --- Text Preprocessing Function ---
# This MUST be the same cleaning as in train_model.py
def clean_text(text):
    text = text.lower()
    text = re.sub(r'\[.*?\]', '', text) # remove text in square brackets
    text = re.sub(r'\W', ' ', text)     # remove special chars
    text = re.sub(r'httpsS?://\S+|www\.\S+', '', text) # remove URLs
    text = re.sub(r'<.*?>+', '', text)  # remove HTML tags
    text = re.sub(r'\n', '', text)      # remove newlines
    return text

@app.route('/')
def home():
    return "Python ML Service for Fake News Detection is running."

@app.route('/predict', methods=['POST'])
def predict():
    """
    Receives text data, cleans it, transforms it, and returns a prediction.
    """
    if request.method == 'POST':
        if not model or not vectorizer:
            return jsonify({'error': 'Model is not loaded. Run train_model.py.'}), 500

        try:
            data = request.get_json()
            text_to_check = data.get('text')

            if not text_to_check:
                return jsonify({'error': 'No text provided.'}), 400

            # 1. Clean the incoming text
            cleaned_text = clean_text(text_to_check)
            
            # 2. Transform the text using the loaded vectorizer
            #    Note: .transform() expects a list or iterable
            processed_text = vectorizer.transform([cleaned_text])

            # 3. Make a prediction
            prediction = model.predict(processed_text) # This will return ['FAKE'] or ['REAL']

            # 4. Send the result back
            result = prediction[0]
            print(f"Prediction for '{cleaned_text[:50]}...': {result}")
            
            return jsonify({
                'prediction': result
            })
            
        except Exception as e:
            print(f"Error during prediction: {e}")
            return jsonify({'error': 'An error occurred during prediction.'}), 500

if __name__ == '__main__':
    port = 5000
    print(f"Starting Flask server on http://127.0.0.1:{port}")
    app.run(host='127.0.0.1', port=port, debug=True)

