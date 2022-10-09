import { PositionFieldDef } from "vega-lite/build/src/channeldef";

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
