import { VegaLite, VisualizationSpec } from "react-vega";
import { Field, PositionFieldDef } from "vega-lite/build/src/channeldef";
import { UnitSpecWithFrame } from "vega-lite/build/src/spec/unit";

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

const heatmapSpec: UnitSpecWithFrame<Field> = {
  width: 1200,
  height: 400,
  mark: "rect",
  encoding: {
    x: dateEncoding,
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
      legend: {
        title: "Monthly installations",
      },
      scale: { scheme: "oranges", type: "log" },
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

const timeSeriesSpec: UnitSpecWithFrame<Field> = {
  width: 1200,
  height: 200,
  mark: { type: "bar", color: "darkorange" },
  encoding: {
    x: { ...dateEncoding, axis: { ...dateEncoding.axis, title: null } },
    y: {
      aggregate: "sum",
      field: "count",
      title: "Total installations",
    },
  },
};

const capacitySpec: UnitSpecWithFrame<Field> = {
  width: 200,
  height: 400,
  mark: { type: "bar", color: "darkorange" },
  encoding: {
    x: {
      aggregate: "sum",
      field: "count",
      title: "Total installations",
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
      axis: {
        orient: "right",
        title: null,
      },
    },
  },
};

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Todo",
    fontSize: 24,
  },
  data: { url: "installation_sizes_processed.csv" },
  transform: [
    {
      filter: "datum.count > 0",
    },
    {
      calculate: "datetime(datum.year, datum.month - 1)",
      as: "date",
    },
  ],
  spacing: 15,
  vconcat: [
    timeSeriesSpec,
    {
      spacing: 15,
      hconcat: [heatmapSpec, capacitySpec],
    },
  ],
};

export default function InstallationSizeHeatmap() {
  return <VegaLite spec={visSpec} />;
}
