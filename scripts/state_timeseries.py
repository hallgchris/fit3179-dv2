import itertools
import pandas as pd

states = [
    "aus",
    "nsw+act",
    "nt",
    "qld",
    "sa",
    "tas",
    "vic",
    "wa",
]

stateNames = [
    "Australia",
    "New South Wales / Australian Capital Territory",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia",
]

csvSizes = [
    "<2.5kW",
    "2.5–4.5",
    "4.5–6.5",
    "6.5–9.5",
    "9.5–14",
    "14–25",
    "25–50",
    "50–100",
    "100kW–5MW",
    "5MW–30MW",
    "30+ MW",
]

outputSizes = [
    "Less than 4.5 kW",
    "4.5 to 9.5 kW",
    "9.5 to 25 kW",
    "25 to 100 kW",
    "100 kW to 30 MW",
    "More than 30 MW",
]


def getBinnedCapacity(row, outputSize):
    if outputSize == outputSizes[0]:
        return row["<2.5kW"] + row["2.5–4.5"]
    elif outputSize == outputSizes[1]:
        return row["4.5–6.5"] + row["6.5–9.5"]
    elif outputSize == outputSizes[2]:
        return row["9.5–14"] + row["14–25"]
    elif outputSize == outputSizes[3]:
        return row["25–50"] + row["50–100"]
    elif outputSize == outputSizes[4]:
        return row["100kW–5MW"] + row["5MW–30MW"]
    elif outputSize == outputSizes[5]:
        return row["30+ MW"]


input_dfs = [
    pd.read_csv(f"data/state_timeseries/{state}.csv", quotechar="'") for state in states
]

output_df = pd.DataFrame(columns=["year", "month", "state", "size", "capacity"])

for state, df in zip(states, input_dfs):
    output_df = pd.concat(
        [
            output_df,
            pd.DataFrame.from_records(
                [
                    {
                        "year": int(row["Month"][:4]),
                        "month": int(row["Month"][5:]),
                        "state": state,
                        "size": outputSizes.index(size),
                        "capacity": int(getBinnedCapacity(row, size) / 1000),
                    }
                    for (_, row), size in itertools.product(df.iterrows(), outputSizes)
                ]
            ),
        ]
    )

output_df.to_csv("vis-website/public/state_time_series.csv", index=False)
