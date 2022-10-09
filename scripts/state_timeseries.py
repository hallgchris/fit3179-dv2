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
    "Less than 2.5 kW",
    "2.5 to 4.5 kW",
    "4.5 to 6.5 kW",
    "6.5 to 9.5 kW",
    "9.5 to 14 kW",
    "14 to 25 kW",
    "25 to 50 kW",
    "50 to 100 kW",
    "100 kW to 5 MW",
    "5 MW to 30 MW",
    "More than 30 MW",
]

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
                        # "size": outputSizes[csvSizes.index(size)],
                        # "size": size,
                        "size": csvSizes.index(size)
                        if csvSizes.index(size) < 10
                        else "a",
                        "capacity": int(row[size]),
                    }
                    for (_, row), size in itertools.product(df.iterrows(), csvSizes)
                ]
            ),
        ]
    )

output_df.to_csv("vis-website/public/state_time_series.csv", index=False)
