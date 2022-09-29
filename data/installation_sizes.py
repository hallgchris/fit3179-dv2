# Basically, we just want to split up the many columns in the source CSV into
# many rows. Less space efficient but easier to plug into vega-lite.

import pandas as pd

sizes = [
    "<2.5kW",
    "2.5<4.5kW",
    "4.5<6.5kW",
    "6.5<9.5kW",
    "9.5<14kW",
    "14<25kW",
    "25<=100kW",
]

df = pd.read_csv("monthly_installations_by_size_category_452e.csv")

df_out = pd.DataFrame(columns=["year", "month", "size", "count"])

# This is bad practice, but whatever it's easy
# https://stackoverflow.com/questions/16476924/how-to-iterate-over-rows-in-a-dataframe-in-pandas
for _, row in df.iterrows():
    for size in sizes:
        df_out = df_out.append(
            {
                "year": row["year"],
                "month": row["month"],
                "size": size,
                "count": int(row[size]),
            },
            ignore_index=True,
        )

df_out.to_csv("installation_sizes_processed.csv", index=False)
