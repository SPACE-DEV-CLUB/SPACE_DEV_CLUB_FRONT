import styled from "@emotion/styled"
import Image from "next/image"
import { useContext, useState } from "react"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { ThemeContext } from "../../pages/_app"
import { ThemeProps } from "../../types/Theme"
import {
  BtnContainer,
  btnStyle,
  DefaultBtn,
  DefaultInput,
  EditBtn,
  formStyle,
  listStyle,
} from "./CommonStyle"

interface ProfileProps {
  check: boolean
  setCheck: (check: boolean) => void
}

const ProfileSetting = ({ check, setCheck }: ProfileProps) => {
  const { theme } = useContext(ThemeContext)
  const [profileName, setProfileName] = useState("")
  const [profileDesc, setProfileDesc] = useState("")

  return (
    <>
      <ImageContainer theme={theme}>
        <ImagePreview
          src={"/image/sampleUser.jpg"}
          alt="profile image"
          width={128}
          height={128}
          layout="fixed"
        />
        <ImageRegister
          background={theme.MAIN}
          hover={theme.SUB}
          color={theme.BACKGROUND}
          theme={theme}
        >
          이미지 업로드
        </ImageRegister>
        <ImageRegister
          background={"transparents"}
          hover={theme.TOGGLE_BACKGROUND}
          color={theme.MAIN}
          theme={theme}
        >
          이미지 제거
        </ImageRegister>
      </ImageContainer>
      {check ? (
        <UserProfileContainer theme={theme}>
          <ProfileForm>
            <ul>
              <ProfileList theme={theme} edit={check}>
                <DefaultInput className={"profilename"} theme={theme} />
              </ProfileList>
              <ProfileList theme={theme} edit={check}>
                <DefaultInput theme={theme} />
              </ProfileList>
            </ul>
            <BtnContainer>
              <DefaultBtn
                background={theme.MAIN}
                hover={theme.SUB}
                color={theme.BACKGROUND}
                theme={theme}
                onClick={() => setCheck(false)}
              >
                저장
              </DefaultBtn>
            </BtnContainer>
          </ProfileForm>
        </UserProfileContainer>
      ) : (
        <UserProfileContainer theme={theme}>
          <ProfileName>minju</ProfileName>
          <ProfileDesc>dfdfdfdfdf</ProfileDesc>
          <EditBtn theme={theme} onClick={() => setCheck(true)}>
            수정
          </EditBtn>
        </UserProfileContainer>
      )}
    </>
  )
}

const ImageRegister = styled.button`
  width: 152px;
  ${btnStyle};
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    width: 128px;
  }
`

const UserProfileContainer = styled.article<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 1px solid ${({ theme }) => theme.SUBBACKGROUND};
  width: 100%;
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    padding: 0;
    padding-left: 24px;
    border: none;
    border-left: 1px solid ${({ theme }) => theme.SUBBACKGROUND};
  }
`

const ProfileName = styled.h2`
  font-size: 18px;
  line-height: 1.5;
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    font-size: 36px;
  }
`

const ProfileDesc = styled.p`
  line-height: 1.5;
  margin: 4px 0 8px;
`

const ProfileList = styled.li`
  ${listStyle};
  .profilename {
    font-size: 24px;
    font-weight: 600;
    height: 46px;
  }
`
const ProfileForm = styled.form`
  ${formStyle};
  flex-direction: column;
`
const ImageContainer = styled.article<ThemeProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 220px;
  padding-bottom: 24px;

  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    padding-right: 24px;
  }
`

const ImagePreview = styled(Image)`
  border-radius: 50%;
`

export default ProfileSetting
