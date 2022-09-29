import pandas as pd

df = pd.read_csv("data/australian_postcodes.csv")

df = df[["postcode", "locality", "state"]]
df = df[df["state"] == "VIC"]
df["locality"] = df["locality"].str.title()

df.to_csv("vis-website/public/postcodes.csv", index=False)
