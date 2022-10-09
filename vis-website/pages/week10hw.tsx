import type { NextPage } from "next";
import { Container, Stack } from "@mui/material";
import HouseholdInstallationMap from "../components/HouseholdInstallationMap";
import CapacityTimeSeriesPlot from "../components/CapacityTimeSeriesPlot";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg" style={{ paddingBottom: 200 }}>
      <Stack spacing={3}>
        <h1>FIT3179 week 10 homework</h1>
        <HouseholdInstallationMap />
        <CapacityTimeSeriesPlot />
      </Stack>
    </Container>
  );
};

export default Home;
