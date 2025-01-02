import numpy as np
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt

import duckdb

#creates a years list of all the election years we have data for
years = np.linspace(2000, 2022, 12)
#initialize a dictionary
d = {}
#cycle through each of the years, adding the year as the key mapped to the dataframe for each year
for year in years:
    #skip rows for headers/US, parse thousands
    d[int(year)] = pd.read_csv('data/election_'+str(int(year))+'.csv', skiprows=[0,2] , thousands=",")
    #make a column for the year
    d[int(year)]['Year'] = int(year)

#make a list to store the dataframes
df_list = []
#for each year in the dictionary (for each year)
for year in d.items():
    #append the dataframe to the list
    df_list.append(year[1])

#concat all the dataframes together, ignoring index
election_year_data = pd.concat(df_list, ignore_index=True)

#print the shape as a sanity check, should number of rows should be 612 = 12*51
print(election_year_data.shape)

#use SQL to change certain column names and create 2 new columns for percentages
election_year_data = duckdb.sql("""SELECT "Unnamed: 0" AS State, Year, "Total Ballots Counted" AS TotalBallots,
                                "Voting-Eligible Population (VEP)" AS VotingEligiblePopulation, 
                                "Voting-Age Population (VAP)" AS VotingAgePopulation, 
                                TotalBallots/VotingEligiblePopulation AS PercentVotingEligibleVotes,
                                TotalBallots/VotingAgePopulation AS PercentVotingAgeVotes
                                FROM election_year_data""").df()

#read in the data
education = pd.read_csv('data/education.csv', thousands=",")
#melt the data into long form
education = education.melt(id_vars=['Name'],value_name="PercentBachelors",var_name="Year")

#read in the csv
income = pd.read_csv('data/income.csv', thousands=",", skiprows=[1])
#melt the data into long form
income = income.melt(id_vars=['Name'],value_name="Income",var_name="Year")

#read in the CSV, skipping the row for the US as a whole
diversity = pd.read_csv('data/diversity.csv', thousands=",", skiprows=[1])
#melt the data into long form
diversity = diversity.melt(id_vars=['Location'],value_name="PercentWhite",var_name="Year")
#fix the year column by only looking at the stuff before __
diversity['Year'] = diversity['Year'].replace(r'(.*)__.*', r'\1', regex=True)

#read in the csv, ignoring rows for headers and the US
age = pd.read_csv('data/age.csv', thousands=",", skiprows=[0,1,3])
#make a list of years we need to find averages for, excluding 2020
list_years = np.arange(2008,2020)
list_years = np.append(list_years, [2021,2022])
#for each value in the list
for i in list_years:
    #make a new column based on the year and populate it with an estimate of the sums of ages
    age[str(i)] = ((age[str(i)+'__Children 0-18']*9) + (age[str(i)+'__Adults 19-25']*22) + (age[str(i)+'__Adults 26-34']*30)
                                  + (age[str(i)+'__Adults 35-54']*45) + (age[str(i)+'__Adults 55-64']*60) + (age[str(i)+'__65+']*75))
    #divide the sum of the ages by the total number of people to find an average
    age[str(i)] = (age[str(i)]) / (age[str(i)+'__Total'])
    
#only select certain columns with the averages
age = age.loc[:,['Location','2008','2010','2012','2014',
                  '2016','2018','2022']]
#melt the dataframe into long format
age = age.melt(id_vars=['Location'],value_name="AverageAge",var_name="Year")
#remove puerto rico from the dataset, since we don't have voting data from there, so we only need 51 states (D.C.)
age = age[age['Location'] != 'Puerto Rico']
#reset the index
age = age.reset_index(drop=True)

#read in the population data
population = pd.read_csv('data/population.csv', thousands=",")
#melt the data into long form
population = population.melt(id_vars=['Name'],value_name="Population",var_name="Year")
#print the shape for sanity, should have 612 rows
print(population.shape)

#read in the area data
area = pd.read_csv('data/area.csv', thousands=",")

#make a new dataframe with the population and area for each state in each year
population_density = duckdb.sql("""SELECT Name,Year,Population,LandAreaSQM 
                                FROM population LEFT JOIN area ON population.Name = area.State""").df()

#make a new column based on the population density calculation (people/sqmi)
population_density['PopulationDensity'] = 1000*population_density['Population']/population_density['LandAreaSQM']

#merging everything together
#left join election_year_data with education
#note the syntax since we don't want duplicate columns for State,Name 
# #since they would multiple w/ multiple joins
election_demographics = duckdb.sql("""SELECT election_year_data.*, PercentBachelors
                                   FROM election_year_data
                                   LEFT JOIN education ON election_year_data.State = education.Name 
                                   AND election_year_data.Year = education.Year""").df()
#left join election_demographics with income
election_demographics = duckdb.sql("""SELECT election_demographics.*, Income
                                   FROM election_demographics
                                   LEFT JOIN income ON election_demographics.State = income.Name 
                                   AND election_demographics.Year = income.Year""").df()
#left join election_demographics with diversity
election_demographics = duckdb.sql("""SELECT election_demographics.*, PercentWhite
                                   FROM election_demographics
                                   LEFT JOIN diversity 
                                   ON election_demographics.State = diversity.Location 
                                   AND election_demographics.Year = diversity.Year""").df()
#left join election_demographics with age
election_demographics = duckdb.sql("""SELECT election_demographics.*, AverageAge
                                   FROM election_demographics
                                   LEFT JOIN age ON election_demographics.State = age.Location 
                                   AND election_demographics.Year = age.Year""").df()
#left join election_demographics with population_density
election_demographics = duckdb.sql("""SELECT election_demographics.*, 
                                   Population, LandAreaSQM, PopulationDensity
                                   FROM election_demographics
                                   LEFT JOIN population_density 
                                   ON election_demographics.State = population_density.Name 
                                   AND election_demographics.Year = population_density.Year""").df()
#verify that the number of NAs is appropriate 
# (since some entire years are missing, thus might appear too high, but there are still plenty of real values)
print(election_demographics.isna().sum())

#add a presidential election column - T if presidential, F if not
election_demographics['Presidential'] = (election_demographics['Year'] % 4) == 0

#write it to a csv as a backup
# election_demographics.to_csv('data/election_demographics.csv')