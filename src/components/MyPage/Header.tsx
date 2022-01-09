import styled from "@emotion/styled"
import Image from "next/image"
import SearchIcon from "@mui/icons-material/Search"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { useState } from "react"
import { HeaderMenu } from "."
import {
  MEDIA_QUERY_END_POINT,
  PALLETS_DARK,
  PALLETS_LIGHT,
} from "../../constants"

interface HeaderProps {
  username: string
  user: boolean
}
export const Header = ({
  username,
  user = false,
}: HeaderProps): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false)

  const handleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <HeaderComponent>
      <HeaderContainer>
        <HeaderUtils>
          {user ? (
            <>
              <LogoLink>
                <LogoImg
                  width="192"
                  height="192"
                  viewBox="0 0 192 192"
                  fill="none"
                >
                  <rect
                    width="192"
                    height="192"
                    fill="currentColor"
                    rx="24"
                  ></rect>
                  <path
                    d="M49 65.48V57.92C53.8 56.36 59.44 54.68 65.92 52.88C72.4 50.96 76.78 50 79.06 50C84.1 50 87.1 52.4 88.06 57.2L99.76 123.62C103.48 118.7 106.54 114.56 108.94 111.2C112.66 105.92 116.08 99.86 119.2 93.02C122.44 86.18 124.06 80.06 124.06 74.66C124.06 71.42 123.16 68.84 121.36 66.92C119.68 64.88 116.5 62.3 111.82 59.18C116.62 53.06 122.62 50 129.82 50C133.66 50 136.84 51.14 139.36 53.42C142 55.7 143.32 59.06 143.32 63.5C143.32 70.94 140.2 80.24 133.96 91.4C127.84 102.44 116.02 119.06 98.5 141.26L80.68 142.52L67 65.48H49Z"
                    fill="white"
                  ></path>
                </LogoImg>
              </LogoLink>
              <UserName>{username}</UserName>
            </>
          ) : (
            <LogoLink>
              <Image
                src="/image/스데브로고.png"
                alt=""
                width={200}
                height={24}
              ></Image>
            </LogoLink>
          )}
        </HeaderUtils>
        <HeaderUtils>
          <SearchBtn className="sc-dxgOiQ ghkPCb" href="">
            <SearchIcon />
          </SearchBtn>
          <NewPostBtn>새 글 작성</NewPostBtn>
          <UserUtils onClick={handleMenu}>
            <UserProfile
              src="/image/sampleUser.jpg"
              alt="userProfile"
              width={40}
              height={40}
            />
            <ArrowDropDownIcon className="arrow" />
            {showMenu && <HeaderMenu />}
          </UserUtils>
        </HeaderUtils>
      </HeaderContainer>
    </HeaderComponent>
  )
}

const HeaderComponent = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderContainer = styled.section`
  display: flex;
  width: 1728px;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  margin: 0 16px;

  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.XLARGE}) {
    width: 1376px;
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.LARGE}) {
    width: 1024px;
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    width: calc(100% - 32px);
  }
`

const HeaderUtils = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  color: ${PALLETS_LIGHT.MAIN_FONT};
  & > *:not(:last-child) {
    margin-right: 12px;
  }
`

const LogoLink = styled.a`
  display: flex;
  align-items: center;
`
const LogoImg = styled.svg`
  width: 24px;
  height: 24px;
`

const UserName = styled.a`
  font-family: "Fira Mono", monospace;
`
const SearchBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:hover,
  &:focus {
    border-radius: 50%;
    background: ${PALLETS_LIGHT.BACKGROUND};
  }
`
const UserUtils = styled.article`
  cursor: pointer;
  display: flex;
  align-items: center;
  svg:hover {
    fill: #000;
  }
  .arrow {
    color: ${PALLETS_LIGHT.SUB};
    &:hover {
      color: ${PALLETS_LIGHT.MAIN};
    }
  }
`

const UserProfile = styled(Image)`
  border-radius: 50%;
`

const NewPostBtn = styled.button`
  height: 32px;
  padding: 1px 16px;
  border-radius: 16px;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  word-break: keep-all;
  background: white;
  border: 1px solid ${PALLETS_LIGHT.SUB_FONT};
  color: ${PALLETS_LIGHT.SUB_FONT};
  transition: all 0.125s ease-in 0s;
  &:hover,
  &:focus {
    color: #fff;
    background: ${PALLETS_DARK.BACKGROUND};
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    display: none;
  }
`
