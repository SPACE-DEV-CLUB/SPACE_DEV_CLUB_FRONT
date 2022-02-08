import { useRouter } from "next/router"
import { memo, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { LinearProgress } from "@mui/material"
import { useData } from "../../hooks/useData"
import qs from "qs"
import Cookies from "js-cookie"

export interface IUser {
  isUser: boolean
}

function Loading() {
  const [isUser, setUser] = useState<IUser | undefined | any>("1")
  const router = useRouter()
  const { data: session, status } = useSession()

  const query = qs.stringify(
    {
      populate: ["*"],
      filters: {
        email: {
          $eq: session?.user?.email,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  const { data, error } = useData("userinfos", query)

  useEffect(() => {
    if (session && data) {
      if (data.data[0]?.attributes.email) {
        setUser(true)
        Cookies.set("user", JSON.stringify(data.data[0].attributes))
      } else if (!data.data[0]?.attributes.email) {
        setUser(false)
      }
      checkOurUser()
    }
  })

  const checkOurUser = () => {
    if (isUser === false) {
      router.push("/signup")
    } else if (isUser === true) {
      router.replace("/")
    }
  }
  return <LinearProgress />
}

export default memo(Loading)
