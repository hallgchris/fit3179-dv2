import pandas as pd

df = pd.read_csv("australian_postcodes.csv")

df = df[["postcode", "locality", "state"]]
df = df[df["state"] == "VIC"]
df["locality"] = df["locality"].str.title()

df.to_csv("postcodes_processed.csv", index=False)
