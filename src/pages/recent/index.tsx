import styled from "@emotion/styled";
import type { NextPage } from "next";
import Head from "next/head";
import { Filter } from "../../components/Home/Filter";
import { CardContainer } from "../../components/Home/CardContainer";
import { Header } from "../../components/Home/Header";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Space Dev Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Header></Header>
        <Filter route={"recent"}></Filter>
        <CardContainer></CardContainer>
      </Main>
    </div>
  );
};

const Main = styled.main`
  background-color: #f8f9fa;
  padding: 16px;
`;

export default Home;
