import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      Hello world!
      <br />
      <Link href="/week9hw">Week 9 homework</Link>
    </div>
  );
};

export default Home;
