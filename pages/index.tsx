import type { NextPage } from "next";
import Head from "next/head";
import MainMenu from "components/MainMenu";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>HOKM</title>
        <meta name="description" content="a mystrious Persian game!" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main>
        <MainMenu />
      </main>
    </div>
  );
};

export default Home;
