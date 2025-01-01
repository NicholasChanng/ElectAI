from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load('voter_turnout_model.pkl')

@app.route('/predict')
def test():
  return model.predict()

if __name__ == '__main__':
    app.run(debug=True)