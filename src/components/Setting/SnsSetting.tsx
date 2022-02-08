import styled from "@emotion/styled"
import { useContext } from "react"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { ThemeContext } from "../../pages/_app"
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
  SnsListProps,
  UserSetting,
} from "./CommonStyle"

interface SnsSetting {
  editSns: boolean
  setEditSns: (editSns: boolean) => void
}

const SnsSetting = ({ editSns, setEditSns }: SnsSetting) => {
  const { theme } = useContext(ThemeContext)
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
                  <DefaultInput theme={theme} />
                </SnsList>
                <SnsList theme={theme} edit={editSns}>
                  <GitHubIcon />
                  <DefaultInput theme={theme} className={"half"} />
                </SnsList>
                <SnsList theme={theme} edit={editSns}>
                  <TwitterIcon />
                  <DefaultInput theme={theme} className={"half"} />
                </SnsList>
                <SnsList theme={theme} edit={editSns}>
                  <FacebookIcon />
                  <DefaultInput theme={theme} />
                </SnsList>
                <SnsList theme={theme} edit={editSns}>
                  <HomeIcon />
                  <DefaultInput theme={theme} />
                </SnsList>
              </SnsContainer>
              <BtnContainer>
                <DefaultBtn
                  background={theme.MAIN}
                  hover={theme.SUB}
                  color={theme.BACKGROUND}
                  theme={theme}
                  onClick={() => setEditSns(false)}
                >
                  저장
                </DefaultBtn>
              </BtnContainer>
            </SnsForm>
          </SettingDesc>
        ) : (
          <SettingDesc>
            <SnsContainer>
              <SnsList theme={theme} edit={editSns}>
                <EmailIcon />
                <span>dfdfd</span>
              </SnsList>
              <SnsList theme={theme} edit={editSns}>
                <GitHubIcon />
                <span>dfdfd</span>
              </SnsList>
              <SnsList theme={theme} edit={editSns}>
                <TwitterIcon />
                <span>dfdfd</span>
              </SnsList>
              <SnsList theme={theme} edit={editSns}>
                <FacebookIcon />
                <span>dfdfd</span>
              </SnsList>
              <SnsList theme={theme} edit={editSns}>
                <HomeIcon />
                <span>dfdfd</span>
              </SnsList>
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
