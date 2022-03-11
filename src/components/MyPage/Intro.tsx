import styled from "@emotion/styled"
import Image from "next/image"
import HomeIcon from "@mui/icons-material/Home"
import GitHubIcon from "@mui/icons-material/GitHub"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import EmailIcon from "@mui/icons-material/Email"
import { MEDIA_QUERY_END_POINT } from "@constants/index"
import { useContext } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"
import Link from "next/link"
import { Theme } from "@styles/theme"
import { userInfo } from "@src/types/Main"

interface IntroProps {
  username: string | string[] | undefined
  userdata: userInfo
}
export const Intro = ({ username, userdata }: IntroProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <Introduce theme={theme}>
      <div className="introContainer">
        <a>
          <ProfileImg
            src={userdata.profileimage || "/image/sampleUser.jpg"}
            alt="profile"
            width={128}
            height={128}
          />
        </a>
        <IntroContext>
          <span className="userName">{userdata.profilename}</span>
          <p className="userDesc">{userdata.profile}</p>
        </IntroContext>
      </div>
      <IntroSns>
        {userdata.github && (
          <Sns className="introGithub">
            <SnsLink href={userdata.github} passHref>
              <a>
                <GitHubIcon className="introIcons" />
              </a>
            </SnsLink>
          </Sns>
        )}
        {userdata.twitter && (
          <Sns className="introTwitter">
            <SnsLink href={userdata.twitter} passHref>
              <a>
                <TwitterIcon className="introIcons" />
              </a>
            </SnsLink>
          </Sns>
        )}
        {userdata.facebook && (
          <Sns className="introFacebook">
            <SnsLink href={userdata.facebook} passHref>
              <a>
                <FacebookIcon className="introIcons" />
              </a>
            </SnsLink>
          </Sns>
        )}
        {userdata.home && (
          <Sns className="introHome">
            <SnsLink href={userdata.home} passHref>
              <a>
                <HomeIcon className="introIcons" />
              </a>
            </SnsLink>
          </Sns>
        )}
        {userdata.snsemail && (
          <SnsEmail theme={theme} email={userdata.snsemail}>
            <SnsLink href={`mailto:${userdata.snsemail}`} passHref>
              <a>
                <EmailIcon className="introIcons" />
              </a>
            </SnsLink>
          </SnsEmail>
        )}
      </IntroSns>
    </Introduce>
  )
}

const Introduce = styled.article<ThemeProps>`
  margin-top: 90px;
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    padding: 16px;
    box-shadow: 0 10px 10px 0 ${({ theme }) => theme.SUBBACKGROUND};
  }
  .introContainer {
    display: flex;
    align-items: center;
    height: 128px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.SUBBACKGROUND};
    @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
      flex-direction: column;
      height: 100%;
      align-items: start;
    }
  }

  .introIcons {
    color: ${({ theme }) => theme.SUB};
  }

  .introIcons:hover {
    color: ${({ theme }) => theme.MAIN};
  }
`

const SnsLink = styled(Link)``

const IntroSns = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;
  li + li {
    margin-left: 16px;
  }
`

interface SnsEmailProps {
  theme: Theme
  email: string | null
}

const SnsEmail = styled.li<SnsEmailProps>`
  display: flex;
  align-items: center;
  &::after {
    content: "${({ email }) => email}";
    display: none;
    position: relative;
    margin-left: 10px;
    padding: 3px;
    font-size: 12px;
    line-height: 1.5;
    background: ${({ theme }) => theme.MAIN};
    color: ${({ theme }) => theme.BACKGROUND};
    border-radius: 5px;
  }
  &:hover:after {
    display: inline;
  }
`

const Sns = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  a {
    display: flex;
    align-items: center;
    height: 100%;
  }
`
const IntroContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px;
  .userName {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .userDesc {
    font-size: 18px;
  }
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    margin: 16px 0;
  }
`

const ProfileImg = styled(Image)`
  border-radius: 50%;
`
