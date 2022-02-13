import styled from "@emotion/styled"
import React, { useContext, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { ThemeContext } from "../../pages/_app"
import { Lock } from "@mui/icons-material"
import { ThemeProps } from "../../types/Theme"
import axios from "axios"
import Router from "next/router"
import { API_ENDPOINT } from "../../constants"
import useSWR, { useSWRConfig } from "swr"
import { fetcher } from "../../utils/fetcher"
import Cookies from "js-cookie"
import { Theme } from "../../styles/theme"

const SignUp = () => {
  const { data: session } = useSession()
  const { theme } = useContext(ThemeContext)
  const [nickName, setNickName] = useState(session?.user?.name)
  const [email, setEmail] = useState(session?.user?.email)
  const [userId, setUserId] = useState("")
  const [lineIntro, setLineIntro] = useState("")
  const [isDuplicate, setDuplicate] = useState(false)
  const [isEmpty, setEmpty] = useState(false)
  const { cache } = useSWRConfig()
  const { data, error } = useSWR(`${API_ENDPOINT}/userinfos`, fetcher)
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
          console.log(res)
          cache.delete(`${API_ENDPOINT}/userinfos`)
          Cookies.set("user", JSON.stringify(res.data.data))
          // 회원가입 이후 유저 데이터 쿠키에 저장 추가해야함.
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
      <h1>환영합니다!</h1>
      <h3>기본 회원 정보를 등록해주세요.</h3>
      <form>
        <label htmlFor="name">이름</label>
        <input
          id="name"
          onChange={(e: any) => setUserId(e.target.value)}
          placeholder="이름을 입력하세요"
          autoComplete="off"
        ></input>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          className="fixed-value"
          id="email"
          disabled
          value={session?.user?.email as string}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="userId">아이디</label>
        <input
          id="userId"
          onChange={(e) => setNickName(e.target.value)}
          placeholder="아이디를 입력하세요"
          autoComplete="off"
        ></input>
        <label htmlFor="intro">한 줄 소개</label>
        <input
          id="intro"
          onChange={(e) => setLineIntro(e.target.value)}
          placeholder="당신을 한 줄로 소개해보세요"
          autoComplete="off"
        ></input>
        <ButtonWrap theme={theme}>
          {isDuplicate && <Warn>이미 존재하는 아이디 입니다.</Warn>}
          {isEmpty && <Warn>빈 칸이 존재합니다.</Warn>}
          <InnerButtonWrap theme={theme} isEmpty>
            <button className="cancel" onClick={handleGoHome} type="button">
              취소
            </button>
            <button className="nextpage" onClick={handleSubmit} type="button">
              다음
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
      background: transparent;
      color: ${({ theme }) => theme.SUB_FONT};
      height: 38px;
      font-size: 24px;
      ::placeholder,
      ::-webkit-input-placeholder {
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
