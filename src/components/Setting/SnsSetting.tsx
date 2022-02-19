import styled from "@emotion/styled"
import { useContext, useState } from "react"
import { API_ENDPOINT, MEDIA_QUERY_END_POINT } from "@src/constants"
import { ThemeContext } from "@pages/_app"
import EmailIcon from "@mui/icons-material/Email"
import GitHubIcon from "@mui/icons-material/GitHub"
import FacebookIcon from "@mui/icons-material/Facebook"
import HomeIcon from "@mui/icons-material/Home"
import TwitterIcon from "@mui/icons-material/Twitter"
import {
  BtnContainer,
  DefaultBtn,
  DefaultInput,
  EditBtn,
  formStyle,
  listStyle,
  Notice,
  SettingDesc,
  SettingName,
  SettingProps,
  SnsListProps,
  UserSetting,
} from "./CommonStyle"
import axios from "axios"
import Cookies from "js-cookie"

const SnsSetting = ({ user }: SettingProps) => {
  const { theme } = useContext(ThemeContext)

  const [editSns, setEditSns] = useState(false)
  const [facebook, setFacebook] = useState(user.attributes.facebook)
  const [twitter, setTwitter] = useState(user.attributes.twitter)
  const [home, setHome] = useState(user.attributes.home)
  const [snsemail, setSnsemail] = useState(user.attributes.snsemail)
  const [github, setGithub] = useState(user.attributes.github)

  const handleSns = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setEditSns(false)

    axios
      .put(`${API_ENDPOINT}/userinfos/${user.id}`, {
        data: {
          facebook: facebook,
          twitter: twitter,
          home: home,
          snsemail: snsemail,
          github: github,
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
        <SettingName>소셜 정보</SettingName>
        {editSns ? (
          <SettingDesc>
            <SnsForm>
              <SnsContainer>
                <SnsList theme={theme} edit={editSns}>
                  <EmailIcon />
                  <DefaultInput
                    theme={theme}
                    value={snsemail}
                    onChange={(e) => setSnsemail(e.target.value.trim())}
                  />
                </SnsList>
                <SnsList theme={theme} edit={editSns}>
                  <GitHubIcon />
                  <DefaultInput
                    theme={theme}
                    className={"half"}
                    value={github}
                    onChange={(e) => setGithub(e.target.value.trim())}
                  />
                </SnsList>
                <SnsList theme={theme} edit={editSns}>
                  <TwitterIcon />
                  <DefaultInput
                    theme={theme}
                    className={"half"}
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value.trim())}
                  />
                </SnsList>
                <SnsList theme={theme} edit={editSns}>
                  <FacebookIcon />
                  <DefaultInput
                    theme={theme}
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value.trim())}
                  />
                </SnsList>
                <SnsList theme={theme} edit={editSns}>
                  <HomeIcon />
                  <DefaultInput
                    theme={theme}
                    value={home}
                    onChange={(e) => setHome(e.target.value.trim())}
                  />
                </SnsList>
              </SnsContainer>
              <BtnContainer>
                <DefaultBtn
                  background={theme.MAIN}
                  hover={theme.SUB}
                  color={theme.BACKGROUND}
                  theme={theme}
                  onClick={handleSns}
                >
                  저장
                </DefaultBtn>
              </BtnContainer>
            </SnsForm>
          </SettingDesc>
        ) : (
          <SettingDesc>
            <SnsContainer>
              {snsemail && (
                <SnsList theme={theme} edit={editSns}>
                  <EmailIcon />
                  <span>{snsemail}</span>
                </SnsList>
              )}
              {github && (
                <SnsList theme={theme} edit={editSns}>
                  <GitHubIcon />
                  <span>{github}</span>
                </SnsList>
              )}
              {twitter && (
                <SnsList theme={theme} edit={editSns}>
                  <TwitterIcon />
                  <span>{twitter}</span>
                </SnsList>
              )}
              {facebook && (
                <SnsList theme={theme} edit={editSns}>
                  <FacebookIcon />
                  <span>{facebook}</span>
                </SnsList>
              )}
              {home && (
                <SnsList theme={theme} edit={editSns}>
                  <HomeIcon />
                  <span>{home}</span>
                </SnsList>
              )}
            </SnsContainer>
            <EditBtn theme={theme} onClick={() => setEditSns(true)}>
              수정
            </EditBtn>
          </SettingDesc>
        )}
      </UserSetting>
      <Notice theme={theme}>
        포스트 및 블로그에서 보여지는 프로필에 공개되는 소셜 정보입니다.
      </Notice>
    </>
  )
}

const SnsContainer = styled.ul`
  padding: 8px 0;
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    padding: 0;
  }
`

const SnsList = styled.li<SnsListProps>`
  display: flex;
  align-items: center;
  svg {
    width: 18px;
    margin-right: 8px;
  }
  .half {
    max-width: 300px;
  }
  ${listStyle};
`

const SnsForm = styled.form`
  ${formStyle};
  flex-direction: column;
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    max-width: 70%;
  }
`

export default SnsSetting
