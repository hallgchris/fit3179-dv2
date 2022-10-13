import { VegaLite, VisualizationSpec } from "react-vega";
import { title } from "vega-lite/build/src/channeldef";
import { dateEncoding, stateLabelLookup } from "./common";

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Total Australian installed solar capacity",
    fontSize: 24,
  },
  width: 1200,
  height: 600,
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
      field: "cumulativeCapacity",
      type: "quantitative",
      scale: { type: "log", domain: [100, 1e8] },
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
