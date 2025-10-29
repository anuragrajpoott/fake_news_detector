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
        print("✅ Model and vectorizer loaded successfully.")
    else:
        print("❌ Error: model.pkl or vectorizer.pkl not found.")
        print("Please run the 'train_model.py' script first.")
except Exception as e:
    print(f"❌ Error loading model files: {e}")
    model = None
    vectorizer = None


# --- Text Preprocessing Function ---
def clean_text(text):
    text = text.lower()
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r'\W', ' ', text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>+', '', text)
    text = re.sub(r'\n', '', text)
    return text


@app.route('/')
def home():
    return jsonify({"message": "Python ML Service for Fake News Detection is running."})


@app.route('/predict', methods=['POST'])
def predict():
    """Receives text data, cleans it, transforms it, and returns a prediction."""
    if not model or not vectorizer:
        return jsonify({'error': 'Model not loaded. Run train_model.py.'}), 500

    try:
        data = request.get_json()
        text_to_check = data.get('text')

        if not text_to_check:
            return jsonify({'error': 'No text provided.'}), 400

        cleaned_text = clean_text(text_to_check)
        processed_text = vectorizer.transform([cleaned_text])
        prediction = model.predict(processed_text)
        result = prediction[0]

        print(f"Prediction for '{cleaned_text[:50]}...': {result}")
        return jsonify({'prediction': result})

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': 'An error occurred during prediction.'}), 500


if __name__ == '__main__':
    # Use PORT from environment (Render sets it automatically)
    port = int(os.environ.get("PORT", 10000))
    print(f"🚀 Starting Flask server on 0.0.0.0:{port}")
    app.run(host='0.0.0.0', port=port)
