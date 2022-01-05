import styled from "@emotion/styled"
import { NextPage } from "next"
import Image from "next/image"
import React from "react"
import { Header, Intro, Mymenu } from "../../components/Layout/Mypage"

const Mypage: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <Intro />
        <Mymenu />
      </Main>
    </>
  )
}

const Main = styled.main`
  width: 768px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export default Mypage;