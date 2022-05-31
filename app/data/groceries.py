import pandas as pd

gl = pd.read_csv('./groceries_list.csv')

names = gl[['Name', 'Quantity']].fillna(1)

print(names)

names.to_csv('./export.csv')