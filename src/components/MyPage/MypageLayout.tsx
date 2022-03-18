import styled from "@emotion/styled"
import Head from "next/head"
import qs from "qs"
import React, { ReactNode } from "react"
import { Header } from "../Common/Header"
import { ErrorPage } from "../Common/ErrorPage"
import { Intro } from "./"
import { Mymenu } from "./Mymenu"
import CardLoading from "../Common/CardLoading"
import TagLoading from "../Tags/TagLoading"
import { fetcher } from "@src/utils/fetcher"
import { API_ENDPOINT } from "@src/constants"
import useSWR from "swr"
import { MypageLoading } from "./MypageLoading"

interface LayoutProps {
  username: string | string[] | undefined
  user: boolean
  indexnum: number
  children?: ReactNode
}

const MypageLayout: React.FC<LayoutProps> = ({
  username,
  user,
  indexnum,
  children,
}) => {
  const query = qs.stringify(
    {
      filters: {
        userid: {
          $eq: username,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )

  const { data, error } = useSWR(`${API_ENDPOINT}/userinfos?${query}`, fetcher)

  if (!data) return <MypageLoading />
  if (!data?.data[0]) return <ErrorPage />
  return (
    <>
      <Head>
        <title>{username} velog</title>
        <meta name="description" content={`${username} | space log`} />
        <link rel="icon" href="/image/스데브.png" />
      </Head>
      <section>
        <Header username={username} user={user} />
        <Main>
          <Intro username={username} userdata={data.data[0].attributes} />
          <Mymenu username={username} indexnum={indexnum} />
          {children}
        </Main>
      </section>
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
export default MypageLayout
