import { VegaLite, VisualizationSpec } from "react-vega";

interface StateLocation {
  name: string;
  loc: [number, number];
  scale: number;
}

const stateLocations: StateLocation[] = [
  { name: "Australia", loc: [134, -28], scale: 1000 },
  { name: "New South Wales", loc: [147, -33], scale: 3500 },
  { name: "Northern Territory", loc: [133, -18.5], scale: 2400 },
  { name: "Queensland", loc: [144, -20], scale: 1900 },
  { name: "South Australia", loc: [136, -32], scale: 2600 },
  { name: "Tasmania", loc: [146, -41.5], scale: 6000 },
  { name: "Victoria", loc: [145.5, -36.6], scale: 6000 },
  { name: "Western Australia", loc: [121, -25], scale: 1600 },
];

const visSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: {
    text: "Household solar installations in Australia",
    fontSize: 16,
    subtitle: "30 June 2022, by LGA",
  },
  width: 1000,
  height: 700,
  params: [
    {
      name: "center",
      value: stateLocations[0],
      bind: {
        name: "Center on: ",
        input: "select",
        options: stateLocations,
        labels: stateLocations.map((state) => state.name),
      },
    },
  ],
  projection: {
    type: "mercator",
    scale: { expr: "center.scale" },
    center: { expr: "center.loc" },
  },
  layer: [
    {
      data: {
        url: "map.json",
        format: {
          type: "topojson",
          feature: "LGA_2022_AUST_GDA2020",
        },
      },
      transform: [
        {
          lookup: "properties.LGA_CODE22",
          from: {
            data: { url: "lgas_11e2.csv" },
            key: "LGA",
            fields: ["dwellings_lga", "instals_lga"],
          },
        },
        {
          calculate: "datum.instals_lga / datum.dwellings_lga",
          as: "installs_per_dwelling",
        },
      ],
      mark: { type: "geoshape", stroke: "black", strokeWidth: 0.3 },
      encoding: {
        tooltip: [
          { field: "properties.LGA_NAME22", title: "Name" },
          {
            field: "installs_per_dwelling",
            title: "% of dwellings with solar",
            format: ".1%",
          },
          { field: "dwellings_lga", title: "Estimated dwellings" },
        ],
        color: {
          field: "installs_per_dwelling",
          type: "quantitative",
          scale: {
            type: "threshold",
            scheme: "oranges",
            domain: [0.15, 0.3, 0.45, 0.6],
          },
          legend: {
            title: "% of dwellings with solar",
            titleLimit: 200,
            orient: "bottom-left",
            direction: "horizontal",
            format: ".0%",
            titleFontSize: 16,
            labelFontSize: 14,
            fillColor: "rgba(255, 255, 255, 0.5)",
            padding: 10,
            cornerRadius: 10,
          },
        },
      },
    },
    {
      data: {
        url: "map.json",
        format: { type: "topojson", feature: "STE_2021_AUST_GDA2020" },
      },
      mark: {
        type: "geoshape",
        stroke: "black",
        fill: null,
        strokeWidth: 0.8,
      },
    },
  ],
};

export default function HouseholdInstallationMap() {
  return <VegaLite spec={visSpec} />;
}
