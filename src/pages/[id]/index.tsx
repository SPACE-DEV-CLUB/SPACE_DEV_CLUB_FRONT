import { NextPage } from "next"
import React from "react"
import { Content } from "../../components/MyPage/Menus"
import MypageLayout from "../../components/MyPage/MypageLayout"
import { useRouter } from "next/router"

const Mypage: NextPage = () => {
  const router = useRouter()
  const userid = String(router.query.id).replace(/[@]/gi, '')

  return (
    <MypageLayout username={userid} user={true} indexnum={0}>
      <Content username={userid} />
    </MypageLayout>
  )
}

export default Mypage
