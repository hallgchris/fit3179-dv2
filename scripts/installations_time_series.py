# Basically, we just want to split up the many columns in the source CSVs into
# many rows. Less space efficient but easier to plug into vega-lite.
# We're also combining two CSVs, one with capacity sizes and one with installation counts.

import pandas as pd

installationCsvSizes = [
    "<2.5kW",
    "2.5<4.5kW",
    "4.5<6.5kW",
    "6.5<9.5kW",
    "9.5<14kW",
    "14<25kW",
    "25<=100kW",
]

capacityCsvSizes = [
    "<2.5kW",
    "2.5–4.5",
    "4.5–6.5",
    "6.5–9.5",
    "9.5–14",
    "14–25",
    # These two are combined into 25-100
    # "25–50",
    # "50–100",
    "25-100",
    "100kW–5MW",
    "5MW–30MW",
    "30+ MW",
]

outputSizes = [
    "Less than 2.5 kW",
    "2.5 to 4.5 kW",
    "4.5 to 6.5 kW",
    "6.5 to 9.5 kW",
    "9.5 to 14 kW",
    "14 to 25 kW",
    "25 to 100 kW",
    "100 kW to 5 MW",
    "5 MW to 30 MW",
    "More than 30 MW",
]

installations_df = pd.read_csv("data/monthly_installations_by_size_category_452e.csv")
capacity_df = pd.read_csv("data/Postcode time series.csv", quotechar="'")

df_out = pd.DataFrame(columns=["year", "month", "size", "installations", "capacity"])

# This is bad practice, but whatever it's easy
# https://stackoverflow.com/questions/16476924/how-to-iterate-over-rows-in-a-dataframe-in-pandas
for _, row in capacity_df.iterrows():
    for size in capacityCsvSizes:
        capacity_modified = (
            int(row[size])
            if size != "25-100"
            else int(row["25–50"]) + int(row["50–100"])
        )
        df_out = df_out.append(
            {
                "year": int(row["Month"][:4]),
                "month": int(row["Month"][5:]),
                "size": outputSizes[capacityCsvSizes.index(size)],
                "installations": None,
                "capacity": capacity_modified,
            },
            ignore_index=True,
        )

df_out.set_index(["year", "month", "size"], inplace=True)

for _, row in installations_df.iterrows():
    for size in installationCsvSizes:
        year = int(row["year"])
        month = int(row["month"])
        outSize = outputSizes[installationCsvSizes.index(size)]
        df_out.loc[year, month, outSize]["installations"] = int(row[size])

df_out.reset_index(inplace=True)

df_out.to_csv("vis-website/public/installations_time_series.csv", index=False)
