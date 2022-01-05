import styled from "@emotion/styled"
import Image from "next/image"

export const Intro: React.FC = () => {
  return (
    <Introduce>
      <div className="introContainer">
        <a>
          <ProfileImg
            src="/image/sampleUser.jpg"
            alt="profile"
            width={128}
            height={128}
          />
        </a>
        <IntroContext>
          <span className="userName">minju</span>
          <p className="userDesc">PRE-FE에서 PRO-FE로🚀🪐!</p>
        </IntroContext>
      </div>
      <ul className="introSns">
        <li>
          <a>icon</a>
        </li>
        <li>
          <a>icon</a>
        </li>
        <li>
          <a>icon</a>
        </li>
      </ul>
    </Introduce>
  )
}

const Introduce = styled.article`
  margin-top: 90px;
  @media screen and (max-width: 768px) {
    padding: 16px;
    box-shadow: 0 10px 10px 0 #f2f2f2;
  }
  .introContainer {
    display: flex;
    align-items: center;
    height: 128px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(233, 236, 239);
    @media screen and (max-width: 768px) {
      flex-direction: column;
      height: 100%;
      align-items: start;
    }
  }
  .introSns {
    width: 100%;
    display: flex;
    margin: 20px 0;
    li + li {
      margin-left: 16px;
    }
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
  @media screen and (max-width: 768px) {
    margin: 0;
  }
`

const ProfileImg = styled(Image)`
  border-radius: 50%;
`
