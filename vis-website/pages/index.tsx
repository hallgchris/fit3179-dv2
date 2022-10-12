import { Container } from "@mui/material";
import type { NextPage } from "next";
import CumulativeCapacityPlot from "../components/CumulativeCapacityPlot";
import HouseholdInstallationMap from "../components/HouseholdInstallationMap";
import InstallationSizeHeatmap from "../components/InstallationSizeHeatmap";
import StateSizeChart from "../components/StateSizeChart";

const Home: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <h1>Solar in Australia</h1>
      <h2>Residential solar usage depends on location</h2>
      <HouseholdInstallationMap />
      <h2>The size of solar installations has increased over time</h2>
      <InstallationSizeHeatmap />
      <h2>The size of solar plants varies between states</h2>
      <StateSizeChart />
      <h2>Australia is increasingly a solar-powered country</h2>
      <CumulativeCapacityPlot />
    </Container>
  );
};

export default Home;
