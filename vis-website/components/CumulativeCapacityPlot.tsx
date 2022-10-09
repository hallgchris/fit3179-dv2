import { VegaLite, VisualizationSpec } from "react-vega";
import { PositionFieldDef } from "vega-lite/build/src/channeldef";

const dateEncoding: PositionFieldDef<"date"> = {
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
};

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Todo",
    fontSize: 24,
  },
  width: 1200,
  height: 400,
  data: { url: "monthly_analysis_data_c3e0.csv" },
  transform: [
    // {
    //   calculate: "datetime(datum.year, datum.month - 1)",
    //   as: "date",
    // },
    // {
    //   calculate: "monthFormat(datum.month - 1)",
    //   as: "monthFormatted",
    // },
  ],
  mark: "line",
  encoding: {
    x: {
      field: "year-month",
      timeUnit: "yearmonth",
    },
    y: {
      field: "cumulative_installed_kw",
      type: "quantitative",
      scale: { type: "log" },
    },
  },
};

export default function CumulativeCapacityPlot() {
  return <VegaLite spec={visSpec} />;
}
