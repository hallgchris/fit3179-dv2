import type { NextPage } from "next";
import Link from "next/link";
import CapacityTimeSeriesPlot from "../components/CapacityTimeSeriesPlot";
import CumulativeCapacityPlot from "../components/CumulativeCapacityPlot";
import InstallationDateHeatmap from "../components/InstallationDateHeatmap";
import InstallationSizeHeatmap from "../components/InstallationSizeHeatmap";

const Home: NextPage = () => {
  return (
    <div>
      Hello world!
      <br />
      <Link href="/week9hw">Week 9 homework</Link>
      <CapacityTimeSeriesPlot />
      <InstallationSizeHeatmap />
      <CumulativeCapacityPlot />
    </div>
  );
};

export default Home;
