import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import React from "react"
import { Content } from "@components/MyPage/Menus"
import MypageLayout from "@components/MyPage/MypageLayout"
import { fetcher } from "@src/utils/fetcher"
import { API_ENDPOINT } from "@src/constants"
import qs from "qs"
import { SWRConfig, unstable_serialize } from "swr"
import { MypageLoading } from "@src/components/MyPage/MypageLoading"

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetcher(`${API_ENDPOINT}/userinfos`)
  const lists = res.data
  // console.log(lists)
  const paths = lists.map((list: any) => ({
    params: { id: list.id.toString() },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = qs.stringify(
    {
      filters: {
        userid: {
          $eq: context.params!.pid,
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  )

  const userdata = await fetcher(`${API_ENDPOINT}/userinfos?${query}`)
  return {
    props: {
      fallback: {
        [unstable_serialize([API_ENDPOINT, "/userinfos?", query])]: userdata,
      },
    },
  }
}

const Mypage = ({
  fallback,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const userid = router.query.id

  if (router.isFallback) {
    return <MypageLoading />
  }

  return (
    <SWRConfig value={{ fallback }}>
      <MypageLayout username={userid} user={true} indexnum={0}>
        <Content username={userid} />
      </MypageLayout>
    </SWRConfig>
  )
}

export default Mypage
