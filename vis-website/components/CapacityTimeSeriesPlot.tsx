import { VegaLite, VisualizationSpec } from "react-vega";
import {
  sizeLabels,
  dateEncoding,
  makeTimeSeriesAnnotation,
  sizeLabelLookup,
  stateLabels,
} from "./common";

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Total solar capacity by installation size and state",
    fontSize: 24,
  },
  width: 1200,
  height: 500,
  params: [
    {
      name: "state_select",
      bind: {
        input: "select",
        name: "State/Territory: ",
        options: ["aus", "nsw+act", "nt", "qld", "sa", "tas", "vic", "wa"],
        labels: stateLabels,
      },
      value: "aus",
    },
    {
      name: "cumulative",
      bind: {
        input: "checkbox",
        name: "Cumulative: ",
      },
      value: true,
    },
  ],
  layer: [
    {
      params: [
        {
          name: "highlight",
          select: { type: "point", on: "mouseover" },
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
        sizeLabelLookup,
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
        {
          joinaggregate: [
            {
              op: "sum",
              field: "chosenCapacity",
              as: "totalCapacity",
            },
          ],
          groupby: ["date", "state"],
        },
      ],
      mark: "area",
      encoding: {
        x: dateEncoding,
        y: {
          field: "chosenCapacity",
          type: "quantitative",
          title: "Total installed capacity (MW)",
        },
        color: {
          field: "sizeLabel",
          type: "ordinal",
          legend: {
            title: "Solar plant capacity",
            labelFontSize: 12,
            orient: "top-left",
          },
          scale: {
            domain: sizeLabels,
          },
        },
        opacity: {
          condition: {
            param: "highlight",
            value: 1,
          },
          value: 0.5,
        },
        order: { field: "size", type: "quantitative" },
        tooltip: [
          {
            field: "year",
            title: "Year",
          },
          {
            title: "Date",
            field: "monthFormatted",
          },
          {
            title: "Plant capacity",
            field: "sizeLabel",
          },
          {
            title: "Installed capacity, this plant size (MW)",
            field: "chosenCapacity",
            format: ",",
          },
          {
            title: "Installed capacity, all plant sizes (MW)",
            field: "totalCapacity",
            format: ",",
          },
        ],
      },
    },
    makeTimeSeriesAnnotation(
      "2015-07-01 00:00:00+10:00",
      8500,
      "Large solar plants become common in 2018",
      "state_select == 'aus'"
    ),
  ],
};

export default function CapacityTimeSeriesPlot() {
  return <VegaLite spec={visSpec} />;
}
