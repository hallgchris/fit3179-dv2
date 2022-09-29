import { useMemo } from "react";
import { VegaLite, VisualizationSpec } from "react-vega";

const vis_spec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Todo",
    fontSize: 24,
  },
  width: 1200,
  height: 900,
  data: { url: "installation_sizes_processed.csv" },
  transform: [
    {
      calculate: "datetime(datum.year, datum.month - 1)",
      as: "date",
    },
  ],
  mark: "rect",
  encoding: {
    x: {
      field: "date",
      timeUnit: "yearmonthdate",
      title: "Year",
      type: "ordinal",
      // Show only year tick labels
      axis: {
        format: "%Y",
        labelAngle: 0,
        labelOverlap: false,
        labelColor: {
          condition: {
            test: {
              timeUnit: "monthdate",
              field: "value",
              equal: { month: 1, date: 1 },
            },
            value: "black",
          },
          value: null,
        },
        // Show ticks every 3 months
        tickColor: {
          condition: {
            test: {
              timeUnit: "monthdate",
              field: "value",
              oneOf: [
                { month: 1, date: 1 },
                { month: 4, date: 1 },
                { month: 7, date: 1 },
                { month: 10, date: 1 },
              ],
            },
            value: "black",
          },
          value: null,
        },
      },
    },
    y: {
      field: "size",
      title: "Installation capacity (kW)",
      type: "ordinal",
      scale: {
        domain: [
          "<2.5kW",
          "2.5<4.5kW",
          "4.5<6.5kW",
          "6.5<9.5kW",
          "9.5<14kW",
          "14<25kW",
          "25<=100kW",
        ],
        reverse: true,
      },
    },
    color: {
      field: "count",
      type: "quantitative",
      legend: { title: "Monthly installations" },
      scale: { scheme: "oranges" },
    },
    tooltip: [
      {
        field: "date",
        title: "Date",
      },
      {
        field: "count",
        title: "Total installations",
      },
    ],
  },
};
export default function InstallationSizeHeatmap() {
  return <VegaLite spec={vis_spec} />;
}
