import styled from "@emotion/styled"
import { NextPage } from "next"
import { useRouter } from "next/router"
import React from "react"
import { SelfIntro } from "../../../components/MyPage/Menus"
import MypageLayout from "../../../components/MyPage/MypageLayout"

const SelfIntroPage: NextPage = () => {
  const router = useRouter()
  const { id, title } = router.query
  return (
    <MypageLayout username={id} user={true} indexnum={2}>
      <SelfIntro />
    </MypageLayout>
  )
}

export default SelfIntroPage
