import { VegaLite, VisualizationSpec } from "react-vega";
import { sizeLabels, sizeLabelLookup, stateLabelLookup } from "./common";

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Total Australian installed solar capacity",
    fontSize: 24,
  },
  width: 1200,
  height: 600,
  data: { url: "state_time_series_notimes.csv" },
  transform: [
    stateLabelLookup,
    sizeLabelLookup,
    {
      joinaggregate: [
        {
          op: "sum",
          field: "capacity",
          as: "totalStateCapacity",
        },
      ],
      groupby: ["state"],
    },
    {
      calculate: "datum.capacity / datum.totalStateCapacity",
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
      axis: { labelExpr: "round(datum.value * 100) + '%'" },
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
