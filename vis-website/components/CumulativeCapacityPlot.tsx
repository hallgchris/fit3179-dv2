import { VegaLite, VisualizationSpec } from "react-vega";
import { dateEncoding, stateLabelLookup } from "./common";

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Australian total installed solar capacity",
    subtitle: "Nationally 2001-present, by state 2007-present",
    fontSize: 16,
  },
  width: 900,
  height: 400,
  data: { url: "state_time_series_nosizes.csv" },
  transform: [
    { filter: "datum.capacity > 0" },
    {
      calculate: "datetime(datum.year, datum.month - 1)",
      as: "date",
    },
    {
      calculate: "monthFormat(datum.month - 1)",
      as: "monthFormatted",
    },
    {
      window: [
        {
          op: "sum",
          field: "capacity",
          as: "cumulativeCapacity",
        },
      ],
      groupby: ["state"],
    },
    {
      calculate: "datum.cumulativeCapacity * 1000",
      as: "cumulativeCapacityW",
    },
    stateLabelLookup,
  ],
  mark: {
    type: "line",
    strokeWidth: 3,
    clip: true,
  },
  encoding: {
    x: dateEncoding,
    y: {
      field: "cumulativeCapacityW",
      type: "quantitative",
      scale: { type: "log", domain: [1e5, 1e11] },
      axis: { values: [1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11], format: "s" },
      title: "Total installed capacity (kW)",
    },
    color: {
      field: "stateLabel",
      legend: {
        title: "State",
        titleFontSize: 16,
        labelFontSize: 14,
        symbolStrokeWidth: 3,
      },
    },
    tooltip: [
      { title: "State", field: "stateLabel" },
      { title: "Date", field: "date", type: "temporal" },
      { title: "Capacity (kW)", field: "cumulativeCapacity", format: "," },
    ],
  },
};

export default function CumulativeCapacityPlot() {
  return <VegaLite spec={visSpec} />;
}
