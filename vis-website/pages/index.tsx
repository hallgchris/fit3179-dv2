import { Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import CumulativeCapacityPlot from "../components/CumulativeCapacityPlot";
import HouseholdInstallationMap from "../components/HouseholdInstallationMap";
import InstallationSizeHeatmap from "../components/InstallationSizeHeatmap";
import StateSizeChart from "../components/StateSizeChart";

const Home: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Solar in Australia</h1>
        </Grid>

        <Grid item xs={12}>
          <h2>Residential solar usage depends on location</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          This is my first bit of text
        </Grid>
        <Grid item xs={12} md={6}>
          This is my second bit of text
        </Grid>
        <Grid item xs={12}>
          <HouseholdInstallationMap />
        </Grid>

        <Grid item xs={12}>
          <h2>The size of solar installations has increased over time</h2>
        </Grid>
        <Grid item xs={12}>
          <InstallationSizeHeatmap />
        </Grid>

        <Grid item xs={12}>
          <h2>The size of solar plants varies between states</h2>
        </Grid>
        <Grid item xs={12}>
          <StateSizeChart />
        </Grid>

        <Grid item xs={12}>
          <h2>Australia is increasingly a solar-powered country</h2>
        </Grid>
        <Grid item xs={12}>
          <CumulativeCapacityPlot />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
