import styled from "@emotion/styled"
import React, { useContext, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { ThemeContext } from "../../pages/_app"
import { Lock } from "@mui/icons-material"
import axios from "axios"
import Router from "next/router"
import { API_ENDPOINT } from "../../constants"
import useSWR, { useSWRConfig } from "swr"
import { fetcher } from "../../utils/fetcher"
import Cookies from "js-cookie"
import { Theme } from "../../styles/theme"
import { useData } from "@src/hooks/useData"
import qs from "qs"

const SignUp = () => {
  const { data: session } = useSession()
  const { theme } = useContext(ThemeContext)
  const [nickName, setNickName] = useState(session?.user?.name)
  const [email, setEmail] = useState<string>(session?.user?.email || "")
  const [userId, setUserId] = useState("")
  const [lineIntro, setLineIntro] = useState("")
  const [isDuplicate, setDuplicate] = useState(false)
  const [isEmpty, setEmpty] = useState(false)
  const { cache } = useSWRConfig()
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
    },
  )

  const { data, error } = useData("userinfos", query)
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setDuplicate(false)
    setEmpty(false)
    if (
      data.data.filter((e: any) => e.attributes?.profilename?.includes(userId))
        .length == 1
    ) {
      setDuplicate(true)
    } else if (nickName == "" || userId == "" || lineIntro == "") {
      setEmpty(true)
    } else {
      await axios
        .post(`${API_ENDPOINT}/userinfos`, {
          data: {
            email: email,
            userid: nickName,
            profilename: userId,
            profile: lineIntro,
            profileimage: session?.user?.image,
          },
        })
        .then((res) => {
          cache.delete(`${API_ENDPOINT}/userinfos`)
          Cookies.set("user", JSON.stringify(res.data.data))
          // ???????????? ?????? ?????? ????????? ????????? ?????? ???????????????.
          Router.replace("/")
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const handleGoHome = async (e: React.MouseEvent<HTMLElement>) => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <SignUpWrap theme={theme} isEmpty={isEmpty}>
      <h1>???????????????!</h1>
      <h3>?????? ?????? ????????? ??????????????????.</h3>
      <form>
        <label htmlFor="name">??????</label>
        <input
          id="name"
          onChange={(e: any) => setUserId(e.target.value)}
          placeholder="????????? ???????????????"
          autoComplete="off"
        ></input>
        <label htmlFor="email">?????????</label>
        <input
          type="text"
          className="fixed-value"
          id="email"
          disabled
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="userId">?????????</label>
        <input
          id="userId"
          onChange={(e) => setNickName(e.target.value)}
          placeholder="???????????? ???????????????"
          autoComplete="off"
        ></input>
        <label htmlFor="intro">??? ??? ??????</label>
        <input
          id="intro"
          onChange={(e) => setLineIntro(e.target.value)}
          placeholder="????????? ??? ?????? ??????????????????"
          autoComplete="off"
        ></input>
        <ButtonWrap theme={theme}>
          {isDuplicate && <Warn>?????? ???????????? ????????? ?????????.</Warn>}
          {isEmpty && <Warn>??? ?????? ???????????????.</Warn>}
          <InnerButtonWrap theme={theme} isEmpty>
            <button className="cancel" onClick={handleGoHome} type="button">
              ??????
            </button>
            <button className="nextpage" onClick={handleSubmit} type="button">
              ??????
            </button>
          </InnerButtonWrap>
        </ButtonWrap>
      </form>
      <LockIcon />
    </SignUpWrap>
  )
}

export default SignUp

interface Props {
  isEmpty: boolean
  theme: Theme
}

const SignUpWrap = styled.div<Props>`
  display: flex;
  flex-direction: column;
  margin: 100px 256px 0 256px;
  h1 {
    font-size: 64px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  h3 {
    font-size: 24px;
    font-weight: 400;
  }
  form {
    display: inline-flex;
    flex-direction: column;
    margin: 48px 0;
    label {
      margin: 24px 0;
    }
    input {
      position: relative;
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 2px solid ${({ isEmpty }) => (isEmpty ? "red" : "")};
      background: transparent;
      color: ${({ theme }) => theme.SUB_FONT};
      height: 38px;
      font-size: 24px;
      ::placeholder,
      ::-webkit-input-placeholder {
        font-size: 24px;
      }
      &.fixed-value {
        border-bottom: 2px solid;
      }
      &:focus {
        outline: none;
        border-bottom: 2px solid ${({ theme }) => theme.BUTTON_MAIN};
      }
    }
  }
`
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 96px;
`
const InnerButtonWrap = styled.div<Props>`
  font-size: 24px;
  margin-top: 20px;
  .cancel {
    color: ${({ theme }) => theme.MAIN_FONT};
    padding: 10px 32px;
    border-radius: 24px;
    background: ${({ theme }) => theme.SUBBACKGROUND};
    font-size: 24px;
    cursor: pointer;
  }
  .nextpage {
    color: #131313;
    padding: 10px 32px;
    margin-left: 16px;
    border-radius: 24px;
    font-size: 24px;
    background: ${({ theme }) => theme.SUB};
    cursor: pointer;
  }
`
const Warn = styled.strong`
  color: red;
`

const LockIcon = styled(Lock)`
  position: absolute;
  top: 430px;
  right: 270px;
`
