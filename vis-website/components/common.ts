import { Text } from "vega";
import { Field, PositionFieldDef } from "vega-lite/build/src/channeldef";
import { UnitSpec } from "vega-lite/build/src/spec";

export const dateEncoding: PositionFieldDef<"date"> = {
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

export const makeTimeSeriesAnnotation = (
  date: string,
  yValue: number,
  text: Text,
  showCondition: string = "true"
): UnitSpec<Field> => ({
  data: [{}],
  encoding: {
    x: {
      datum: Number(new Date(date)),
      type: "ordinal",
    },
    y: {
      datum: yValue,
    },
    opacity: {
      condition: {
        test: showCondition,
        value: 1,
      },
      value: 0,
    },
  },
  mark: {
    type: "text",
    align: "left",
    baseline: "bottom",
    text,
  },
});

export const stateLabels = [
  "Australia",
  "New South Wales + ACT",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
];

const csvStates = ["aus", "nsw+act", "nt", "qld", "sa", "tas", "vic", "wa"];

export const stateLabelLookup = {
  lookup: "state",
  from: {
    key: "state",
    data: {
      values: csvStates.map((state, i) => ({ state, label: stateLabels[i] })),
    },
    fields: ["label"],
  },
  as: "stateLabel",
};

export const sizeLabels = [
  "Less than 4.5 kW",
  "4.5 to 9.5 kW",
  "9.5 to 25 kW",
  "25 to 100 kW",
  "100 kW to 30 MW",
  "More than 30 MW",
];

export const sizeLabelLookup = {
  lookup: "size",
  from: {
    key: "size",
    data: {
      values: sizeLabels.map((size, i) => ({ size: i, label: size })),
    },
    fields: ["label"],
  },
  as: "sizeLabel",
};
