import styled from "@emotion/styled"
import axios from "axios"
import Cookies from "js-cookie"
import Image from "next/image"
import React, { useContext, useState } from "react"
import { API_ENDPOINT, MEDIA_QUERY_END_POINT } from "../../constants"
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
  SettingProps,
} from "./CommonStyle"

const ProfileSetting = ({ user }: SettingProps) => {
  const { theme } = useContext(ThemeContext)
  const [check, setCheck] = useState(false)

  const [profileName, setProfileName] = useState(user.attributes.profilename)
  const [profileDesc, setProfileDesc] = useState(user.attributes.profile)
  const [profileImg, setProfileImg] = useState(user.attributes.profileimage)

  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const uploadFile = e.target.files[0]
      const formData = new FormData()
      formData.append("file", uploadFile)
      setProfileImg(URL.createObjectURL(e.target.files[0]))

      axios
        .put(`${API_ENDPOINT}/userinfos/${user.id}`, {
          data: {
            profileimage: URL.createObjectURL(e.target.files[0]),
          },
        })
        .then(function (res) {
          Cookies.set("user", JSON.stringify(res.data.data))
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const removeProfileImg = () => {
    setProfileImg("/image/sampleUser.jpg")

    axios
      .put(`${API_ENDPOINT}/userinfos/${user.id}`, {
        data: {
          profileimage: "/image/sampleUser.jpg",
        },
      })
      .then(function (res) {
        Cookies.set("user", JSON.stringify(res.data.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleProfile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setCheck(false)

    axios
      .put(`${API_ENDPOINT}/userinfos/${user.id}`, {
        data: {
          profile: profileDesc,
          profilename: profileName,
        },
      })
      .then(function (res) {
        Cookies.set("user", JSON.stringify(res.data.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <ImageContainer theme={theme}>
        <ImagePreview
          src={profileImg}
          alt="profile image"
          width={128}
          height={128}
        />
        <input
          type="file"
          accept="image/*"
          id="profile-upload"
          className="sr-only"
          onChange={handleProfileImg}
        />
        <ImageRegister
          htmlFor="profile-upload"
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
          onClick={removeProfileImg}
        >
          이미지 제거
        </ImageRegister>
      </ImageContainer>
      {check ? (
        <UserProfileContainer theme={theme}>
          <ProfileForm>
            <ul>
              <ProfileList theme={theme} edit={check}>
                <DefaultInput
                  className={"profilename"}
                  theme={theme}
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </ProfileList>
              <ProfileList theme={theme} edit={check}>
                <DefaultInput
                  theme={theme}
                  value={profileDesc}
                  onChange={(e) => setProfileDesc(e.target.value)}
                />
              </ProfileList>
            </ul>
            <BtnContainer>
              <DefaultBtn
                background={theme.MAIN}
                hover={theme.SUB}
                color={theme.BACKGROUND}
                theme={theme}
                onClick={(e) => handleProfile(e)}
              >
                저장
              </DefaultBtn>
            </BtnContainer>
          </ProfileForm>
        </UserProfileContainer>
      ) : (
        <UserProfileContainer theme={theme}>
          <ProfileName>{profileName}</ProfileName>
          <ProfileDesc>{profileDesc}</ProfileDesc>
          <EditBtn theme={theme} onClick={() => setCheck(true)}>
            수정
          </EditBtn>
        </UserProfileContainer>
      )}
    </>
  )
}

const ImageRegister = styled.label`
  width: 152px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
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
