import styled from "@emotion/styled"
import type { NextPage } from "next"
import Head from "next/head"
import { Filter } from "@components/Home/Filter"
import { Header } from "@components/Common/Header"
import EasterEgg from "@components/Common/EasterEgg"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>spacelog</title>
        <meta property="og:image" content="https://user-images.githubusercontent.com/47337588/155908236-e0fa1e38-31fd-4616-a382-ef0431b7f362.png"></meta>
        <meta name="description" content="개발의 우주에서 나의 이야기를 펼쳐보세요." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Header user={false}></Header>
        <Filter route={"home"}></Filter>
        <EasterEgg />
      </Main>
    </div>
  )
}

const Main = styled.main`
  padding: 0 16px 16px;
`

export default Home
