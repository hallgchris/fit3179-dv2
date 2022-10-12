import { VegaLite, VisualizationSpec } from "react-vega";
import { Field, PositionFieldDef } from "vega-lite/build/src/channeldef";
import { LayerSpec } from "vega-lite/build/src/spec";
import { UnitSpec, UnitSpecWithFrame } from "vega-lite/build/src/spec/unit";
import { dateEncoding, makeTimeSeriesAnnotation } from "./common";

const capacityEncoding: PositionFieldDef<"size"> = {
  field: "size",
  title: "Installation capacity (kW)",
  type: "ordinal",
  // @ts-ignore - this seems to work fine for vega-lite...
  sort: { field: "sizeMin" },
  scale: { reverse: true },
};

const makeHeatmapAnnotation = (
  date: string,
  capacity: string,
  text: string
): UnitSpec<Field> => ({
  data: { values: [{}] },
  mark: {
    type: "text",
    align: "left",
    color: "black",
    size: 14,
    text,
  },
  encoding: {
    x: {
      datum: Number(new Date(date)),
      type: "ordinal",
    },
    y: {
      datum: capacity,
      type: "ordinal",
    },
  },
});

const heatmapSpec: LayerSpec<Field> = {
  width: 1200,
  height: 400,
  layer: [
    {
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
            titleFontSize: 16,
            labelFontSize: 14,
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
    },
    makeHeatmapAnnotation(
      "2017-07-01 00:00:00+10:00",
      "14 to 25 kW",
      "Large installations are often completed at end of year"
    ),
    makeHeatmapAnnotation(
      "2015-07-01 00:00:00+10:00",
      "4.5 to 6.5 kW",
      "Average installation sizes steady increases"
    ),
  ],
};

const timeSeriesSpec: LayerSpec<Field> = {
  layer: [
    {
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
    },
    makeTimeSeriesAnnotation("2011-07-01 00:00:00+10:00", 70000, [
      "NSW Solar Bonus Scheme ends",
      "5x solar multiplier ends",
    ]),
    makeTimeSeriesAnnotation("2012-07-01 00:00:00+10:00", 60000, [
      "QLD Solar Bonus Scheme ends",
      "3x solar multiplier ends",
    ]),
    makeTimeSeriesAnnotation(
      "2013-01-01 00:00:00+11:00",
      30000,
      "2x solar multiplier ends"
    ),
  ],
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
