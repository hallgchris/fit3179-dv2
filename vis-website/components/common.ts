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
