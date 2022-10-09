import type { NextPage } from "next";
import { Container } from "@mui/material";
import HouseholdInstallationMap from "../components/HouseholdInstallationMap";

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <h1>FIT3179 week 9 homework</h1>
      <HouseholdInstallationMap />
    </Container>
  );
};

export default Home;
