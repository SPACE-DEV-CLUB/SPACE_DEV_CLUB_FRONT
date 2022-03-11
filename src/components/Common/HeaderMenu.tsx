import styled from "@emotion/styled"
import Link from "next/link"
import { MEDIA_QUERY_END_POINT } from "@src/constants"
import { useContext } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"
import { signOut } from "next-auth/react"
import Cookies from "js-cookie"
import Loading from "./Loading"

interface HeaderMenuProps {
  session: string | undefined | null
}

export const HeaderMenu = ({ session }: HeaderMenuProps) => {
  const { theme } = useContext(ThemeContext)

  const userCookieData = Cookies.get("user")
  if (!userCookieData) return <Loading />

  // 에러 처리
  const userInfo = JSON.parse(userCookieData).attributes

  return (
    <Menus theme={theme}>
      <MenuList>
        <Link href={`/${userInfo.userid}`} passHref>
          <MenuBtn theme={theme}>내 벨로그</MenuBtn>
        </Link>
      </MenuList>
      <MenuList className="newPost">
        <Link href={"/write"} passHref>
          <MenuBtn theme={theme}>새 글 작성</MenuBtn>
        </Link>
      </MenuList>
      <MenuList>
        <Link href={"/"} passHref>
          <MenuBtn theme={theme}>임시 글</MenuBtn>
        </Link>
      </MenuList>
      <MenuList>
        <Link href={"/list/read"} passHref>
          <MenuBtn theme={theme}>읽기 목록</MenuBtn>
        </Link>
      </MenuList>
      <MenuList>
        <Link href={"/setting"} passHref>
          <MenuBtn theme={theme}>설정</MenuBtn>
        </Link>
      </MenuList>
      <MenuList>
        <Link href={""} passHref>
          <MenuBtn
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              Cookies.remove("user")
              signOut()
            }}
            theme={theme}
          >
            로그아웃
          </MenuBtn>
        </Link>
      </MenuList>
    </Menus>
  )
}

const Menus = styled.ul<ThemeProps>`
  position: absolute;
  top: 50px;
  right: 10px;
  background: ${({ theme }) => theme.CARD_BACKGROUND};
  z-index: 100;
  box-shadow: 0 0 15px 0 ${({ theme }) => theme.TOGGLE_BACKGROUND};
  .newPost {
    display: none;
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
      display: block;
    }
  }
`
const MenuList = styled.li``

const MenuBtn = styled.a<ThemeProps>`
  display: inline-block;
  width: 192px;
  padding: 14px 16px;
  text-align: left;
  box-sizing: border-box;
  line-height: 1.25;
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.MAIN_FONT};
  &:hover {
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
  }
`
