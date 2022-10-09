import { VegaLite, VisualizationSpec } from "react-vega";
import { dateEncoding } from "./common";

const capacities = [
  "Less than 4.5 kW",
  "4.5 to 9.5 kW",
  "9.5 to 25 kW",
  "25 to 100 kW",
  "100 kW to 30 MW",
  "More than 30 MW",
];

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Total solar capacity by installation size and state",
    fontSize: 24,
  },
  width: 1200,
  height: 500,
  params: [
    {
      name: "state_select",
      bind: {
        input: "select",
        name: "State/Territory: ",
        options: ["aus", "nsw+act", "nt", "qld", "sa", "tas", "vic", "wa"],
        labels: [
          "Australia",
          "New South Wales + Australian Capital Territory",
          "Northern Territory",
          "Queensland",
          "South Australia",
          "Tasmania",
          "Victoria",
          "Western Australia",
        ],
      },
      value: "aus",
    },
    {
      name: "cumulative",
      bind: {
        input: "checkbox",
        name: "Cumulative: ",
      },
      value: true,
    },
    {
      name: "highlight",
      select: { type: "point", on: "mouseover" },
    },
  ],
  data: { url: "state_time_series.csv" },
  transform: [
    {
      filter: "datum.state == state_select",
    },
    {
      calculate: "datetime(datum.year, datum.month - 1)",
      as: "date",
    },
    {
      calculate: "monthFormat(datum.month - 1)",
      as: "monthFormatted",
    },
    {
      lookup: "size",
      from: {
        key: "size",
        data: {
          values: capacities.map((size, i) => ({ size: i, label: size })),
        },
        fields: ["label"],
      },
      as: "sizeLabel",
    },
    {
      window: [
        {
          op: "sum",
          field: "capacity",
          as: "cumulativeCapacity",
        },
      ],
      groupby: ["size"],
    },
    {
      calculate: "cumulative ? datum.cumulativeCapacity : datum.capacity",
      as: "chosenCapacity",
    },

    {
      joinaggregate: [
        {
          op: "sum",
          field: "chosenCapacity",
          as: "totalCapacity",
        },
      ],
      groupby: ["date", "state"],
    },
  ],
  mark: "area",
  encoding: {
    x: dateEncoding,
    y: {
      field: "chosenCapacity",
      type: "quantitative",
      title: "Total installed capacity (MW)",
    },
    color: {
      field: "sizeLabel",
      type: "ordinal",
      legend: {
        title: "Solar plant capacity",
        labelFontSize: 12,
        orient: "top-left",
      },
      scale: {
        domain: capacities,
      },
    },
    opacity: {
      condition: {
        param: "highlight",
        value: 1,
      },
      value: 0.5,
    },
    order: { field: "size", type: "quantitative" },
    tooltip: [
      {
        field: "year",
        title: "Year",
      },
      {
        title: "Date",
        field: "monthFormatted",
      },
      {
        title: "Plant capacity",
        field: "sizeLabel",
      },
      {
        title: "Installed capacity, this plant size (MW)",
        field: "chosenCapacity",
        format: ",",
      },
      {
        title: "Installed capacity, all plant sizes (MW)",
        field: "totalCapacity",
        format: ",",
      },
    ],
  },
};

export default function CapacityTimeSeriesPlot() {
  return <VegaLite spec={visSpec} />;
}
