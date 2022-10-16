import { VegaLite, VisualizationSpec } from "react-vega";
import { sizeLabels, sizeLabelLookup, stateLabelLookup } from "./common";

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Solar plant sizes by Australian state",
    fontSize: 16,
  },
  width: 900,
  height: 400,
  data: { url: "state_time_series.csv" },
  params: [
    {
      name: "time_slider",
      value: 2022,
      bind: {
        name: "Year: ",
        input: "range",
        min: 2010,
        max: 2022,
        step: 1,
      },
    },
  ],
  transform: [
    {
      window: [
        {
          op: "sum",
          field: "capacity",
          as: "cumulativeCapacity",
        },
      ],
      groupby: ["state", "size"],
    },
    { filter: "datum.year == time_slider" },
    { filter: "datum.month == 1" },
    stateLabelLookup,
    sizeLabelLookup,
    {
      joinaggregate: [
        {
          op: "sum",
          field: "cumulativeCapacity",
          as: "totalStateCapacity",
        },
      ],
      groupby: ["state"],
    },
    {
      calculate: "datum.cumulativeCapacity / datum.totalStateCapacity",
      as: "normalisedCapacity",
    },
  ],
  mark: "bar",
  encoding: {
    x: {
      field: "stateLabel",
      type: "nominal",
      title: "State",
      axis: { labelAngle: 0 },
    },
    y: {
      field: "normalisedCapacity",
      type: "quantitative",
      title: "% of total state solar generation",
      axis: {
        labelExpr: "round(datum.value * 100) + '%'",
      },
      scale: { domain: [0, 1] },
    },
    order: {
      field: "size",
    },
    color: {
      field: "sizeLabel",
      type: "ordinal",
      scale: {
        scheme: "oranges",
        domain: sizeLabels,
      },
      legend: {
        title: "Installation size",
        titleFontSize: 16,
        labelFontSize: 14,
      },
    },
    tooltip: [
      { title: "State", field: "stateLabel" },
      { title: "Installation size", field: "sizeLabel" },
      { title: "Capacity for this size (kW)", field: "capacity" },
      {
        title: "Total state capacity (kW)",
        field: "totalStateCapacity",
        format: ",",
      },
      {
        title: "% of state capacity",
        field: "normalisedCapacity",
        format: ".1%",
      },
    ],
  },
};

export default function StateSizeChart() {
  return <VegaLite spec={visSpec} />;
}
