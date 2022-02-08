import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Image from "next/image"
import { useContext, useState } from "react"
import { Theme } from "../../styles/theme"
import { ThemeContext } from "../../pages/_app"
import { ThemeProps } from "../../types/Theme"
import { MEDIA_QUERY_END_POINT } from "../../constants"

import {
  DefaultBtn,
  DefaultInput,
  EditBtn,
  formStyle,
  Notice,
  SettingDesc,
  SettingName,
  UserSetting,
} from "./CommonStyle"
import Profile from "./ProfileSetting"
import SnsSetting from "./SnsSetting"

export const SettingForm = () => {
  const { theme } = useContext(ThemeContext)

  const [editProfile, setEditProfile] = useState(false)
  const [editVelogTitle, setEditVelogTitle] = useState(false)
  const [editSns, setEditSns] = useState(false)

  const handleEditProfile = (check: boolean) => {
    setEditProfile(check)
  }

  const handleEditSns = (check: boolean) => {
    setEditSns(check)
  }

  return (
    <SettingContainer theme={theme}>
      <ProfileContainer>
        <Profile check={editProfile} setCheck={handleEditProfile} />
      </ProfileContainer>
      {/* 유저 정보 */}
      <UserSettingContainer theme={theme}>
        <UserSetting>
          <SettingName>벨로그 제목</SettingName>
          {editVelogTitle ? (
            <SettingDesc>
              <TitleForm>
                <DefaultInput theme={theme}></DefaultInput>
                <DefaultBtn
                  background={theme.MAIN}
                  hover={theme.SUB}
                  color={theme.BACKGROUND}
                  theme={theme}
                >
                  저장
                </DefaultBtn>
              </TitleForm>
            </SettingDesc>
          ) : (
            <SettingDesc>
              <SettingDetails>
                <SettingDetail theme={theme}>Delight</SettingDetail>
              </SettingDetails>
              <EditBtn
                onClick={() => setEditVelogTitle(!editProfile)}
                theme={theme}
              >
                수정
              </EditBtn>
            </SettingDesc>
          )}
        </UserSetting>
        <Notice theme={theme}>
          개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다.
        </Notice>
      </UserSettingContainer>
      <UserSettingContainer theme={theme}>
        <SnsSetting editSns={editSns} setEditSns={handleEditSns} />
      </UserSettingContainer>
      <UserSettingContainer theme={theme}>
        <UserSetting>
          <SettingName>이메일 주소</SettingName>
          <SettingDesc>
            <SettingDetails>
              <SettingDetail theme={theme}>Delight</SettingDetail>
            </SettingDetails>
            <EditBtn theme={theme}>수정</EditBtn>
          </SettingDesc>
        </UserSetting>
        <Notice theme={theme}>
          회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.
        </Notice>
      </UserSettingContainer>
      <UserSettingContainer theme={theme}>
        <UserSetting>
          <SettingName>소셜 정보</SettingName>
          <SettingDesc>
            <AlarmContainer>
              <AlarmChecker>
                <AlarmName>댓글 알림</AlarmName>
                <AlarmBtn theme={theme} />
              </AlarmChecker>
              <AlarmChecker>
                <AlarmName>스데브 업데이트 소식</AlarmName>
                <AlarmBtn theme={theme} />
              </AlarmChecker>
            </AlarmContainer>
          </SettingDesc>
        </UserSetting>
      </UserSettingContainer>
      <UserSettingContainer theme={theme}>
        <UserSetting>
          <SettingName>회원 탈퇴</SettingName>
          <SettingDesc>
            <DefaultBtn
              theme={theme}
              background={theme.WARNING_MAIN}
              hover={theme.WARNING_SUB}
              color={theme.BACKGROUND}
            >
              회원 탈퇴
            </DefaultBtn>
          </SettingDesc>
        </UserSetting>
        <Notice theme={theme}>
          개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다.
        </Notice>
      </UserSettingContainer>
    </SettingContainer>
  )
}

const SettingContainer = styled.section<ThemeProps>`
  max-width: 768px;
  padding: 0 16px 80px 16px;
  margin: 48px auto 0;
`

const ProfileContainer = styled.article`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    flex-direction: row;
  }
`
const UserSettingContainer = styled.article<ThemeProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 1px solid ${({ theme }) => theme.SUBBACKGROUND};
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    border: none;
    &:not(:nth-of-type(2)) {
      border-top: 1px solid ${({ theme }) => theme.SUBBACKGROUND};
    }
  }
`

const SettingDetails = styled.div`
  display: flex;
  flex-direction: column;
`
const SettingDetail = styled.p<ThemeProps>`
  line-height: 1.5;
  padding: 8px 0;
  color: ${({ theme }) => theme.SUB_FONT};
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    padding: 0;
  }
`

const AlarmContainer = styled.ul`
  padding: 8px 0;
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    padding: 0;
  }
`
const AlarmChecker = styled.li`
  display: flex;
  width: 270px;
  justify-content: space-between;
  align-items: center;
  & + & {
    margin-top: 8px;
  }
`
const AlarmName = styled.span``
const AlarmBtn = styled.button<ThemeProps>`
  width: 46px;
  height: 24px;
  border-radius: 24px;
  position: relative;
  background: ${({ theme }) => theme.MAIN};
  border: 1px solid ${({ theme }) => theme.MAIN};
  &:after {
    content: "";
    width: 20px;
    height: 20px;
    position: absolute;
    top: 1px;
    left: 1px;
    background: ${({ theme }) => theme.BACKGROUND};
    border-radius: 50%;
  }
`

const TitleForm = styled.form`
  ${formStyle}
`
