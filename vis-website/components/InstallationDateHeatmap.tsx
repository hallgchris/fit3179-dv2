import { VegaLite, VisualizationSpec } from "react-vega";

const vis_spec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Todo",
    fontSize: 24,
  },
  width: 1200,
  height: 900,
  data: { url: "monthly_installations_by_size_category_452e.csv" },
  transform: [
    {
      calculate: "datetime(datum.year, datum.month - 1)",
      as: "date",
    },
  ],
  config: { axis: { domain: false } },
  mark: "rect",
  encoding: {
    x: {
      field: "date",
      timeUnit: "year",
      title: "Year",
      type: "ordinal",
    },
    y: {
      field: "date",
      timeUnit: "month",
      title: "Month",
      type: "ordinal",
    },
    color: {
      field: "installations_in_month",
      type: "quantitative",
      legend: {
        title: "Total installations",
      },
    },
    tooltip: [
      {
        field: "date",
        title: "Date",
      },
      {
        field: "installations_in_month",
        title: "Total installations",
      },
    ],
  },
};

export default function InstallationDateHeatmap() {
  return <VegaLite spec={vis_spec} />;
}
