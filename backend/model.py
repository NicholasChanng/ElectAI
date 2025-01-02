import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import joblib

demographics = pd.read_csv('data/election_demographics_final.csv', index_col=False)

input_vars = ['Presidential', 'PercentBachelors', 'Income', 'PercentWhite', 'AverageAge']
# demographics_train, demographics_test = train_test_split(demographics, test_size=0.2, random_state=2950)

# Train the model
model = LinearRegression().fit(demographics[input_vars], demographics['PercentVotingEligibleVotes'])

# Save the model
joblib.dump(model, 'voter_turnout_model.pkl')