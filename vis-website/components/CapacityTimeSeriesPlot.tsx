import { VegaLite, VisualizationSpec } from "react-vega";

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Todo",
    fontSize: 24,
  },
  width: 1200,
  height: 400,
  params: [
    {
      name: "state_select",
      bind: {
        input: "select",
        name: "State/Territory",
        options: ["aus", "nsw+act", "nt", "qld", "sa", "tas", "vic", "wa"],
      },
      value: "aus",
    },
    {
      name: "cumulative",
      bind: {
        input: "checkbox",
        name: "Cumulative",
      },
    },
  ],
  data: { url: "state_time_series.csv" },
  transform: [
    {
      filter: "datum.state == state_select",
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
        key: "size",
        data: {
          values: [
            { size: 0, label: "Less than 2.5 kW" },
            { size: 1, label: "2.5 to 4.5 kW" },
            { size: 2, label: "4.5 to 6.5 kW" },
            { size: 3, label: "6.5 to 9.5 kW" },
            { size: 4, label: "9.5 to 14 kW" },
            { size: 5, label: "14 to 25 kW" },
            { size: 6, label: "25 to 50 kW" },
            { size: 7, label: "50 to 100 kW" },
            { size: 8, label: "100 kW to 5 MW" },
            { size: 9, label: "5 MW to 30 MW" },
            { size: "a", label: "More than 30 MW" },
          ],
        },
        fields: ["label"],
      },
      as: "sizeLabel",
    },
    {
      window: [
        {
          op: "sum",
          field: "capacity",
          as: "cumulativeCapacity",
        },
      ],
      groupby: ["size"],
    },
    {
      calculate: "cumulative ? datum.cumulativeCapacity : datum.capacity",
      as: "chosenCapacity",
    },
  ],
  mark: "area",
  encoding: {
    x: {
      field: "date",
      timeUnit: "yearmonth",
    },
    y: {
      field: "chosenCapacity",
      type: "quantitative",
    },
    color: {
      field: "sizeLabel",
      type: "ordinal",
      legend: {
        title: "Solar plant size",
      },
      scale: {
        domain: [
          "Less than 2.5 kW",
          "2.5 to 4.5 kW",
          "4.5 to 6.5 kW",
          "6.5 to 9.5 kW",
          "9.5 to 14 kW",
          "14 to 25 kW",
          "25 to 50 kW",
          "50 to 100 kW",
          "100 kW to 5 MW",
          "5 MW to 30 MW",
          "More than 30 MW",
        ],
      },
    },
    order: { field: "size", type: "quantitative" },
    tooltip: [{ field: "size" }, { field: "sizeLabel" }],
  },
};

export default function CapacityTimeSeriesPlot() {
  return <VegaLite spec={visSpec} />;
}
