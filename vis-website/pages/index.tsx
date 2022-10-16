import { Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import CumulativeCapacityPlot from "../components/CumulativeCapacityPlot";
import HouseholdInstallationMap from "../components/HouseholdInstallationMap";
import InstallationSizeHeatmap from "../components/InstallationSizeHeatmap";
import StateSizeChart from "../components/StateSizeChart";

const CenterGridItem = (props: { children: React.ReactNode }) => (
  <Grid item xs={12} textAlign="center">
    {props.children}
  </Grid>
);

const Highlight = (props: { color: string; children: React.ReactNode }) => (
  <span style={{ fontWeight: "bold", color: props.color }}>
    {props.children}
  </span>
);

const darkOrange = "#c94503";
const lightOrange = "#f87f2c";

const Home: NextPage = () => {
  return (
    <Container maxWidth="xl" style={{ paddingBottom: 200 }}>
      <Grid container spacing={3}>
        <CenterGridItem>
          <h1>☀️ Solar Power in Australia ☀️</h1>
        </CenterGridItem>

        <Grid item xs={12}>
          <h2>Residential solar usage depends on location</h2>
        </Grid>
        <Grid item xs={12} md={4}>
          In states that receive relatively little solar radiation (i.e.
          Victoria, NSW and Tasmania), household solar is{" "}
          <Highlight color={lightOrange}>less common</Highlight> in urban areas.
        </Grid>
        <Grid item xs={12} md={4}>
          The opposite is true in more sunny states, with noticeable{" "}
          <Highlight color={darkOrange}>
            concentrations of solar usage
          </Highlight>{" "}
          in around Perth, Brisbane, Adelaide and Darwin.
        </Grid>
        <Grid item xs={12} md={4}>
          There are many factors which influence this. In rural areas, solar may
          be an attractive option for powering detached or off-grid buildings.
          In densely populated CBDs, solar is often infeasible due to reduced
          roof space and shading from nearby buildings.
        </Grid>
        <CenterGridItem>
          <HouseholdInstallationMap />
        </CenterGridItem>

        <Grid item xs={12}>
          <h2>The size of solar installations has increased over time</h2>
        </Grid>
        <Grid item xs={12} md={4}>
          More and more houses in Australia are choosing to install solar
          panels. However, we&apos;re not close to reaching the peak rates of
          installations seen in 2011/2012.
          <br />
          <br />
          During this time, many states offered generous incentives for
          households to install solar panels, including the Solar Bonus Schemes,
          solar multipliers and feed-in tariffs. Curiously, it seems the
          greatest incentives were the ending of these programs - unrivalled
          quantities of households purchased solar as these ended in order to
          lock-in these benefits.
        </Grid>
        <Grid item xs={12} md={4}>
          The average size of solar installations has been steadily increasing
          over the last decade, likely due to improvements in solar panel
          technology and its falling cost.
          <br />
          <br />
          An interesting observation is that the larger of the small scale solar
          installations (14 to 100 kW) are often completed at the end of the
          year. These systems may be installed by businesses or schools where
          aiming to complete a project at the end of a year is convenient.
        </Grid>
        <Grid item xs={12} md={4}>
          With both increasing quantity and size of installations, it&apos;s
          clear that solar in Australia is on a strong upward trajectory.
          <br />
          <br />
          <i>
            <b>How to read:</b> This visualisation explores the quantity and
            sizes of individual solar installations, not their combined
            capacity. The central heatmap shows the number of each size of
            installation over the last decade. The two histograms sum this data
            in the vertical and horizontal axes.
          </i>
        </Grid>
        <CenterGridItem>
          <InstallationSizeHeatmap />
        </CenterGridItem>

        <Grid item xs={12}>
          <h2>The size of solar plants varies between states</h2>
        </Grid>
        <Grid item xs={12} md={4}>
          Majority of states have their solar generation capacity come primarily
          from two sources:{" "}
          <Highlight color={lightOrange}>
            Household-scale solar (4.5 to 9.5 kW)
          </Highlight>{" "}
          and{" "}
          <Highlight color={darkOrange}>
            large-scale solar power plants (over 30 MW)
          </Highlight>
          .
          <br />
          <br />
          However, there are a few interesting exceptions to this. Tasmania has
          close to zero large-scale solar generation, as its lack of solar
          radiation makes such an investment unfeasible.
        </Grid>
        <Grid item xs={12} md={4}>
          Northern Territory has an abnormally large amount of mid-scale
          generation (100 kW to 30 MW), a category of solar installation rarely
          found in other states despite the very wide range of capacities
          enclosed.
          <br />
          <br />
          Perhaps unsurprisingly, the states with the most untypical
          distribution of installation sizes are also those with the least
          installations/smallest sample size.
        </Grid>
        <Grid item xs={12} md={4}>
          Using the "Year" slider, we can see that barely a decade ago, the
          average size of solar installations was notably small by today&apos;s
          standards. The vast majority of household installations were in the{" "}
          <Highlight color={lightOrange}>smallest size category</Highlight>, and{" "}
          <Highlight color={darkOrange}>large-scale solar farms</Highlight>{" "}
          scarcely existed at all.
        </Grid>
        <CenterGridItem>
          <StateSizeChart />
        </CenterGridItem>

        <Grid item xs={12}>
          <h2>Australia is an increasingly solar-powered country</h2>
        </Grid>
        <Grid item xs={12} md={4}>
          The amount of solar power available in{" "}
          <Highlight color="#3c6888">Australia</Highlight> has been growing
          exponentially since the first panels appeared two decades ago.
        </Grid>
        <Grid item xs={12} md={4}>
          Most notable is a large jump in 2006, due to the opening of Emu Downs
          Solar Farm in <Highlight color="#e77">Western Australia</Highlight>.
          This was by far the largest solar plant at the time, and was a major
          milestone in the development of solar power in Australia.
          {/* (Actually, I believe this is entirely fake news on the data
          source's behalf, but I shall pretend I didn't notice that) */}
        </Grid>
        <Grid item xs={12} md={4}>
          The amount of installed solar across Australia's states spans an order
          of magnitude. At first it's easy to blame this on a lack of sunlight
          for places like <Highlight color="#db3">Tasmania</Highlight>, but it
          turns out for it&apos;s small population, it has a similar amount per
          capita as other states.
        </Grid>
        <CenterGridItem>
          <CumulativeCapacityPlot />
        </CenterGridItem>
        <Grid item xs={12} style={{ fontSize: 12 }}>
          <i>
            Data supplied by Australian PV Institute (APVI) Solar Map, funded by
            the Australian Renewable Energy Agency, accessed from
            pv-map.apvi.org.au on 16 October 2022.
          </i>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
