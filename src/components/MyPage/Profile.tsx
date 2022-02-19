import styled from "@emotion/styled"
import Image from "next/image"
import { MEDIA_QUERY_END_POINT } from "@src/constants"
import { useContext } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"

interface IProfile {
  id: string | string[] | undefined
  profileImgUrl: string | undefined
}

export const Profile = ({ id, profileImgUrl }: IProfile) => {
  const { theme } = useContext(ThemeContext)
  return (
    <ProfileContainer theme={theme}>
      <div className="img-wrap">
        {profileImgUrl && (
          <Image
            alt="thumbnail"
            width={100}
            height={100}
            src={profileImgUrl}
          ></Image>
        )}
      </div>
      <span className="id">{id}</span>
    </ProfileContainer>
  )
}

const ProfileContainer = styled.section<ThemeProps>`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  vertical-align: center;
  .img-wrap {
    width: 48px;
    height: 48px;
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
    border-radius: 50%;
    overflow: hidden;
    margin-right: 16px;
  }
  span {
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.MAIN_FONT};
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    .img-wrap {
      width: 32px;
      height: 32px;
    }
  }
`
