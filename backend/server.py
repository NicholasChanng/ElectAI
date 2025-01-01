from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load('voter_turnout_model.pkl')
# input_vars = ['Year', 'Presidential', 'PercentBachelors', 'Income', 'PercentWhite', 'AverageAge']


@app.route('/predict')
def predict(year, presidential, percent_bachelors, income, percent_white, average_age):
  return str(model.predict([[2024, 1, 40.0, 40.1, 70.1, 30.1]])[0])

if __name__ == '__main__':
    app.run(debug=True)