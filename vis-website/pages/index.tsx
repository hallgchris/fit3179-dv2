import type { NextPage } from "next";
import Link from "next/link";
import InstallationDateHeatmap from "../components/InstallationDateHeatmap";
import InstallationSizeHeatmap from "../components/InstallationSizeHeatmap";

const Home: NextPage = () => {
  return (
    <div>
      Hello world!
      <br />
      <Link href="/week9hw">Week 9 homework</Link>
      <InstallationSizeHeatmap />
    </div>
  );
};

export default Home;
