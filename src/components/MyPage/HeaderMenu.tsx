import styled from "@emotion/styled"
import {
  MEDIA_QUERY_END_POINT,
  PALLETS_DARK,
  PALLETS_LIGHT,
} from "../../constants"

export const HeaderMenu = () => {
  return (
    <Menus>
      <MenuList>
        <MenuBtn>내 벨로그</MenuBtn>
      </MenuList>
      <MenuList className="newPost">
        <MenuBtn>새 글 작성</MenuBtn>
      </MenuList>
      <MenuList>
        <MenuBtn>임시 글</MenuBtn>
      </MenuList>
      <MenuList>
        <MenuBtn>읽기 목록</MenuBtn>
      </MenuList>
      <MenuList>
        <MenuBtn>설정</MenuBtn>
      </MenuList>
      <MenuList>
        <MenuBtn>로그아웃</MenuBtn>
      </MenuList>
    </Menus>
  )
}

const Menus = styled.ul`
  position: absolute;
  top: 70px;
  right: 16px;
  background: ${PALLETS_LIGHT.CARD_BACKGROUND};
  box-shadow: 0 0 20px 0 #efefef;
  .newPost {
    display: none;
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
      display: block;
    }
  }
`
const MenuList = styled.li``

const MenuBtn = styled.button`
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
