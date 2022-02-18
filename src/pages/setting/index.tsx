import { NextPage } from "next"
import Head from "next/head"
import React from "react"
import { Header } from "@components/Common/Header"
import { SettingForm } from "@components/Setting/SettingForm"

const Setting: NextPage = () => {
  return (
    <>
      <Head>
        <title>Space Dev Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/image/스데브.png" />
      </Head>
      <section>
        <Header user={false} />
        <SettingForm />
      </section>
    </>
  )
}

export default Setting
