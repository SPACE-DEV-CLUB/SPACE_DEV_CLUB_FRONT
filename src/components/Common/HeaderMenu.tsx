import styled from "@emotion/styled"
import Link from "next/link"
import {
  MEDIA_QUERY_END_POINT,
  PALLETS_DARK,
  PALLETS_LIGHT,
} from "../../constants"

interface HeaderMenuProps {
  username: string | string[] | undefined
}

export const HeaderMenu = ({ username }: HeaderMenuProps) => {
  return (
    <Menus>
      <MenuList>
        <Link href={`/${username}`} passHref>
          <MenuBtn>내 벨로그</MenuBtn>
        </Link>
      </MenuList>
      <MenuList className="newPost">
        <Link href={"/"} passHref>
          <MenuBtn>새 글 작성</MenuBtn>
        </Link>
      </MenuList>
      <MenuList>
        <Link href={"/"} passHref>
          <MenuBtn>임시 글</MenuBtn>
        </Link>
      </MenuList>
      <MenuList>
        <Link href={"/"} passHref>
          <MenuBtn>읽기 목록</MenuBtn>
        </Link>
      </MenuList>
      <MenuList>
        <Link href={"/"} passHref>
          <MenuBtn>설정</MenuBtn>
        </Link>
      </MenuList>
      <MenuList>
        <Link href={"/"} passHref>
          <MenuBtn>로그아웃</MenuBtn>
        </Link>
      </MenuList>
    </Menus>
  )
}

const Menus = styled.ul`
  position: absolute;
  top: 50px;
  right: 10px;
  background: ${PALLETS_LIGHT.CARD_BACKGROUND};
  z-index: 100;
  box-shadow: 0 0 20px 0 #efefef;
  .newPost {
    display: none;
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
      display: block;
    }
  }
`
const MenuList = styled.li``

const MenuBtn = styled.a`
  display: inline-block;
  width: 192px;
  padding: 14px 16px;
  text-align: left;
  box-sizing: border-box;
  line-height: 1.25;
  font-weight: 500;
  font-size: 16px;
  &:hover {
    background: ${PALLETS_LIGHT.SUB};
  }
`
