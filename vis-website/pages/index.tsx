import { Container, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import CumulativeCapacityPlot from "../components/CumulativeCapacityPlot";
import HouseholdInstallationMap from "../components/HouseholdInstallationMap";
import InstallationSizeHeatmap from "../components/InstallationSizeHeatmap";
import StateSizeChart from "../components/StateSizeChart";

const Home: NextPage = () => {
  return (
    <Container maxWidth="xl" style={{ paddingBottom: 200 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Solar Power in Australia ☀️</h1>
        </Grid>

        <Grid item xs={12}>
          <h2>Residential solar usage depends on location</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          In states that receive relatively little solar radiation (i.e.
          Victoria, NSW and Tasmania), household solar is less common in urban
          areas.
          <br />
          <br />
          The opposite is true in more sunny states, with noticeable The
          opposite is true in more sunny states, with noticeable concentrations
          of solar usage in around Perth, Brisbane, Adelaide and Darwin.
        </Grid>
        <Grid item xs={12} md={6}>
          There are many factors which influence this. In rural areas, solar may
          be an attractive option for powering detached or off-grid buildings.
          In densely populated CBDs, solar is often infeasible due to reduced
          roof space and shading from nearby buildings.
        </Grid>
        <Grid item xs={12}>
          <HouseholdInstallationMap />
        </Grid>

        <Grid item xs={12}>
          <h2>The size of solar installations has increased over time</h2>
        </Grid>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          The average size of solar installations has been steadily increasing
          over the last decade, likely due to improvements in solar panel
          technology and its falling cost.
          <br />
          <br />
          An interesting observation is that the larger of the small scale solar
          installations (14 to 100 kW) are often completed at the end of the
          year. These systems may be installed by businesses or schools where
          aiming to complete a project at the end of a year is convenient.
          <br />
          <br />
          With both increasing quantity and size of installations, it&apos;s
          clear that solar in Australia is on a strong upward trajectory.
        </Grid>
        <Grid item xs={12}>
          <InstallationSizeHeatmap />
        </Grid>

        <Grid item xs={12}>
          <h2>The size of solar plants varies between states</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          Majority of states have their solar generation capacity come primarily
          from two sources: Household-scale solar (4.5 to 9.5 kW) and
          large-scale solar power plants (over 30 MW).
          <br />
          <br />
          However, there are a few interesting exceptions to this. Tasmania has
          close to zero large-scale solar generation, as its lack of solar
          radiation makes such an investment unfeasible.
        </Grid>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12}>
          <StateSizeChart />
        </Grid>

        <Grid item xs={12}>
          <h2>Australia is increasingly a solar-powered country</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          The amount of solar power available in Australia has been growing
          exponentially since the first panels appeared two decades ago.
        </Grid>
        <Grid item xs={12} md={6}>
          TODO: Discuss those big jumps
        </Grid>
        <Grid item xs={12}>
          <CumulativeCapacityPlot />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
