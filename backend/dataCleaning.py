import numpy as np
import pandas as pd
import duckdb

demographics = pd.read_csv('data/election_demographics_amended.csv', index_col=False)

demographics['Presidential'] = demographics['Presidential'].astype(int)

demographics = demographics[['State','Year','TotalBallots','PercentVotingEligibleVotes',
                             'PercentBachelors','Income','PercentWhite','AverageAge','Presidential']]

demographics['PercentVotingEligibleVotes'] = demographics['PercentVotingEligibleVotes'] * 100
demographics['PercentWhite'] = demographics['PercentWhite'] * 100
demographics['Income'] = demographics['Income'] / 1000

demographics['YearsSince2000'] = demographics['Year'] - 2000

demographics_presidential = duckdb.sql("""SELECT State,Year,YearsSince2000,PercentVotingEligibleVotes
                                       FROM demographics WHERE Presidential=1""").df()
demographics_midterm = duckdb.sql("""SELECT State,Year,YearsSince2000,PercentVotingEligibleVotes
                                  FROM demographics WHERE Presidential=0""").df()

demographics = demographics.dropna()
demographics_presidential = demographics_presidential.dropna()
demographics_midterm = demographics_midterm.dropna()

demographics.to_csv('data/election_demographics_final.csv')
demographics_presidential.to_csv('data/election_demographics_presidential.csv')
demographics_midterm.to_csv('data/election_demographics_midterm.csv')