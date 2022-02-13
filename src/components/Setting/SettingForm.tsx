import styled from "@emotion/styled"
import { useContext } from "react"
import { ThemeContext } from "../../pages/_app"
import { ThemeProps } from "../../types/Theme"
import { API_ENDPOINT, MEDIA_QUERY_END_POINT } from "../../constants"
import {
  btnStyle,
  DefaultBtn,
  EditBtn,
  Notice,
  SettingDesc,
  SettingDetail,
  SettingDetails,
  SettingName,
  UserSetting,
} from "./CommonStyle"
import Profile from "./ProfileSetting"
import SnsSetting from "./SnsSetting"
import Cookies from "js-cookie"
import VelogTitleSetting from "./VelogTitleSetting"
import axios from "axios"
import { signOut } from "next-auth/react"
import Router from "next/router"

export const SettingForm = () => {
  const { theme } = useContext(ThemeContext)

  const userCookieData = Cookies.get("user")
  if (!userCookieData) return null
  //   에러 처리
  const userData = JSON.parse(userCookieData)

  const withdrawalUser = () => {
    axios
      .delete(`${API_ENDPOINT}/userinfos/${userData.id}`)
      .then(function (res) {
        Cookies.remove("user")
        signOut()
        Router.replace("/")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <SettingContainer theme={theme}>
      <ProfileContainer>
        <Profile user={userData} />
      </ProfileContainer>
      {/* 유저 정보 */}
      <UserSettingContainer theme={theme}>
        <VelogTitleSetting user={userData} />
      </UserSettingContainer>
      <UserSettingContainer theme={theme}>
        <SnsSetting user={userData} />
      </UserSettingContainer>
      <UserSettingContainer theme={theme}>
        <UserSetting>
          <SettingName>이메일 주소</SettingName>
          <SettingDesc>
            <SettingDetails>
              <SettingDetail theme={theme}>
                {userData.attributes.email}
              </SettingDetail>
            </SettingDetails>
          </SettingDesc>
        </UserSetting>
        <Notice theme={theme}>
          회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.
        </Notice>
      </UserSettingContainer>
      <UserSettingContainer theme={theme}>
        <UserSetting>
          <SettingName>이메일 수신 설정</SettingName>
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
            <WithdrawalBtn
              theme={theme}
              background={theme.WARNING_MAIN}
              hover={theme.WARNING_SUB}
              color={theme.BACKGROUND}
              type="button"
              onClick={withdrawalUser}
            >
              회원 탈퇴
            </WithdrawalBtn>
          </SettingDesc>
        </UserSetting>
        <Notice theme={theme}>
          탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
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
const WithdrawalBtn = styled.button`
  ${btnStyle}
`
