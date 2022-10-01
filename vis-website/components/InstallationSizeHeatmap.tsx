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

const capacityEncoding: PositionFieldDef<"size"> = {
  field: "size",
  title: "Installation capacity (kW)",
  type: "ordinal",
  scale: {
    domain: [
      "Less than 2.5 kW",
      "2.5 to 4.5 kW",
      "4.5 to 6.5 kW",
      "6.5 to 9.5 kW",
      "9.5 to 14 kW",
      "14 to 25 kW",
      "25 to 100 kW",
    ],
    reverse: true,
  },
};

const heatmapSpec: UnitSpecWithFrame<Field> = {
  width: 1200,
  height: 400,
  mark: {
    type: "rect",
    // Move marks so that the year lines pass between them not through them
    xOffset: 5,
    clip: true,
  },
  encoding: {
    x: {
      ...dateEncoding,
      axis: {
        ...dateEncoding.axis,
        grid: true,
        gridOpacity: {
          condition: {
            test: {
              timeUnit: "monthdate",
              field: "value",
              equal: { month: 1, date: 1 },
            },
            value: 1,
          },
          value: 0,
        },
        gridWidth: 1,
        // Dashed grid so that changes in colour over year boundaries are clearer
        gridDash: [3, 10],
      },
    },
    y: capacityEncoding,
    color: {
      field: "installations",
      type: "quantitative",
      legend: {
        title: "Monthly installations",
        offset: -250,
        labelFontSize: 12,
      },
      scale: { scheme: "oranges", type: "log" },
    },
    tooltip: [
      {
        field: "year",
        title: "Year",
      },
      {
        field: "monthFormatted",
        title: "Month",
      },
      { title: "Installation capacity (kW)", field: "size" },
      {
        field: "installations",
        title: "Installations",
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
      field: "installations",
      title: "Monthly installations",
    },
    tooltip: [
      {
        field: "year",
        title: "Year",
      },
      {
        field: "monthFormatted",
        title: "Month",
      },
      {
        title: "Installations",
        field: "installations",
        aggregate: "sum",
        format: ",",
      },
    ],
  },
};

const capacitySpec: UnitSpecWithFrame<Field> = {
  width: 200,
  height: 400,
  mark: { type: "bar", color: "darkorange" },
  encoding: {
    x: {
      aggregate: "sum",
      field: "installations",
      title: "Total installations",
    },
    y: {
      ...capacityEncoding,
      axis: {
        orient: "right",
        title: null,
        domain: false,
        ticks: false,
        labelPadding: 10,
      },
    },
    tooltip: [
      { title: "Installation capacity (kW)", field: "size" },
      {
        title: "Installations",
        field: "installations",
        aggregate: "sum",
        format: ",",
      },
    ],
  },
};

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Solar installation capacity over time",
    fontSize: 24,
  },
  data: { url: "installations_time_series.csv" },
  transform: [
    {
      filter: "datum.installations > 0",
    },
    {
      calculate: "datetime(datum.year, datum.month - 1)",
      as: "date",
    },
    {
      calculate: "monthFormat(datum.month - 1)",
      as: "monthFormatted",
    },
  ],
  spacing: 5,
  vconcat: [
    timeSeriesSpec,
    {
      spacing: 0,
      hconcat: [heatmapSpec, capacitySpec],
    },
  ],
};

export default function InstallationSizeHeatmap() {
  return <VegaLite spec={visSpec} />;
}
