import { NextPage } from "next"
import React from "react"
import { Series } from "../../../components/MyPage/Menus"
import MypageLayout from "../../../components/MyPage/MypageLayout"
import { useRouter } from "next/router"

const SeriesPage: NextPage = () => {
  const router = useRouter()
  const { id, title } = router.query
  return (
    <MypageLayout username={id} user={true} indexnum={1}>
      <Series username={id} />
    </MypageLayout>
  )
}

export default SeriesPage
