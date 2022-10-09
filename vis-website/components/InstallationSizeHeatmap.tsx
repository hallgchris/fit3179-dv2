import { VegaLite, VisualizationSpec } from "react-vega";
import { Field, PositionFieldDef } from "vega-lite/build/src/channeldef";
import { UnitSpecWithFrame } from "vega-lite/build/src/spec/unit";
import { dateEncoding } from "./common";

const capacityEncoding: PositionFieldDef<"size"> = {
  field: "size",
  title: "Installation capacity (kW)",
  type: "ordinal",
  // @ts-ignore - this seems to work fine for vega-lite...
  sort: { field: "sizeMin" },
  scale: { reverse: true },
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
    text: "Solar installation breakdown by capacity over time",
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
    {
      lookup: "size",
      from: {
        data: {
          values: [
            { sizeMin: 0, sizeLabel: "Less than 2.5 kW" },
            { sizeMin: 2.5, sizeLabel: "2.5 to 4.5 kW" },
            { sizeMin: 4.5, sizeLabel: "4.5 to 6.5 kW" },
            { sizeMin: 6.5, sizeLabel: "6.5 to 9.5 kW" },
            { sizeMin: 9.5, sizeLabel: "9.5 to 14 kW" },
            { sizeMin: 14, sizeLabel: "14 to 25 kW" },
            { sizeMin: 25, sizeLabel: "25 to 100 kW" },
            { sizeMin: 100, sizeLabel: "100 kW to 5 MW" },
            { sizeMin: 5000, sizeLabel: "5 MW to 30 MW" },
            { sizeMin: 30000, sizeLabel: "More than 30 MW" },
          ],
        },
        key: "sizeLabel",
        fields: ["sizeMin"],
      },
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
