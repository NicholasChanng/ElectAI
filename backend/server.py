from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)

# Enable CORS for all routes
cors = CORS(app, origins='*')

model = joblib.load('voter_turnout_model.pkl')
# input_vars = ['Year', 'Presidential', 'PercentBachelors', 'Income', 'PercentWhite', 'AverageAge']
# year (1980-2060), presidential (0 or 1), percent_bachelors, income, percent_white, average_age

@app.route('/api/predict', methods=['POST'])
def predict():
  data = request.get_json()
  data['averageIncome'] /= 1000
  features = np.array(list(data.values())).reshape(1, -1)[:, 1:]
  prediction = model.predict(features)
  return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True, port=8080)