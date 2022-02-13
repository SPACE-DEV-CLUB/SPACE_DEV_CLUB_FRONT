import styled from "@emotion/styled"
import axios from "axios"
import Cookies from "js-cookie"
import { useContext, useState } from "react"
import { API_ENDPOINT } from "../../constants"
import { ThemeContext } from "../../pages/_app"
import {
  DefaultBtn,
  DefaultInput,
  EditBtn,
  formStyle,
  Notice,
  SettingDesc,
  SettingDetail,
  SettingDetails,
  SettingName,
  SettingProps,
  UserSetting,
} from "./CommonStyle"

const VelogTitleSetting = ({ user }: SettingProps) => {
  const { theme } = useContext(ThemeContext)
  const [editVelogTitle, setEditVelogTitle] = useState(false)
  const [velogTitle, setVelogTitle] = useState(
    user.attributes.velogtitle
      ? user.attributes.velogtitle
      : `${user.attributes.userid}.log`
  )

  const handleTitle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setEditVelogTitle(false)

    axios
      .put(`${API_ENDPOINT}/userinfos/${user.id}`, {
        data: {
          velogtitle: velogTitle,
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
      <UserSetting>
        <SettingName>벨로그 제목</SettingName>
        {editVelogTitle ? (
          <SettingDesc>
            <TitleForm>
              <DefaultInput
                theme={theme}
                value={velogTitle}
                onChange={(e) => setVelogTitle(e.target.value)}
              />
              <DefaultBtn
                background={theme.MAIN}
                hover={theme.SUB}
                color={theme.BACKGROUND}
                theme={theme}
                onClick={handleTitle}
              >
                저장
              </DefaultBtn>
            </TitleForm>
          </SettingDesc>
        ) : (
          <SettingDesc>
            <SettingDetails>
              <SettingDetail theme={theme}>{velogTitle}</SettingDetail>
            </SettingDetails>
            <EditBtn onClick={() => setEditVelogTitle(true)} theme={theme}>
              수정
            </EditBtn>
          </SettingDesc>
        )}
      </UserSetting>
      <Notice theme={theme}>
        개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다.
      </Notice>
    </>
  )
}

export default VelogTitleSetting

const TitleForm = styled.form`
  ${formStyle}
`
