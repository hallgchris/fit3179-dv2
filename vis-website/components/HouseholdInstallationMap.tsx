import { VegaLite, VisualizationSpec } from "react-vega";

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Household solar installations in Victoria",
    fontSize: 24,
    subtitle: "30 June 2022, by postcode",
  },
  width: 1200,
  height: 900,
  projection: {
    type: "mercator",
    scale: 6700,
    center: [145, -36.5],
  },
  layer: [
    {
      data: {
        url: "POA_2021_AUST_GDA2020.json",
        format: {
          type: "topojson",
          feature: "POA_2021_AUST_GDA2020",
        },
      },
      transform: [
        {
          lookup: "properties.POA_CODE21",
          from: {
            data: { url: "postcodes_0188.csv" },
            key: "postcode",
            fields: ["estimated_dwellings", "instals"],
          },
        },
        {
          lookup: "properties.POA_CODE21",
          from: {
            data: { url: "postcodes.csv" },
            key: "postcode",
            fields: ["locality"],
          },
        },
        {
          calculate: "datum.instals / datum.estimated_dwellings",
          as: "installs_per_dwelling",
        },
      ],
      mark: { type: "geoshape", stroke: "black", strokeWidth: 0.3 },
      encoding: {
        tooltip: [
          { field: "locality", title: "Name" },
          { field: "properties.POA_CODE21", title: "Post code" },
          {
            field: "installs_per_dwelling",
            title: "% of dwellings with solar",
            format: ".1%",
          },
          { field: "estimated_dwellings", title: "Estimated dwellings" },
        ],
        color: {
          field: "installs_per_dwelling",
          type: "quantitative",
          scale: {
            type: "threshold",
            scheme: "inferno",
            domain: [0.15, 0.3, 0.45, 0.6],
            range: ["#feedde", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603"],
          },
          legend: {
            title: "% of dwellings with solar",
            titleLimit: 200,
            orient: "top-right",
            direction: "horizontal",
            format: ".0%",
            titleFontSize: 16,
            labelFontSize: 14,
          },
        },
      },
    },
    {
      data: {
        url: "STE_2021_AUST_GDA2020.json",
        format: { type: "topojson", feature: "STE_2021_AUST_GDA2020" },
      },
      mark: {
        type: "geoshape",
        stroke: "black",
        fill: null,
        strokeWidth: 0.8,
      },
    },
  ],
};

export default function HouseholdInstallationMap() {
  return <VegaLite spec={visSpec} />;
}
