import styled from "@emotion/styled";
import Image from "next/image";
import { MEDIA_QUERY_END_POINT, PALLETS_LIGHT } from "../../constants";
import SearchIcon from "@mui/icons-material/Search";

export const Header = (): JSX.Element => {
  return (
    <HeaderContainer>
      <HeaderUtils>
        <LogoLink>
          <Image
            src="/image/스데브로고.png"
            alt=""
            width={200}
            height={24}
          ></Image>
        </LogoLink>
      </HeaderUtils>
      <HeaderUtils>
        <SearchBtn className="sc-dxgOiQ ghkPCb" href="">
          <SearchIcon />
        </SearchBtn>
        <NewPostBtn>새 글 작성</NewPostBtn>
        <UserUtils>
          <UserProfile
            src="/image/sampleUser.jpg"
            alt="userProfile"
            width={40}
            height={40}
          />
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </UserUtils>
      </HeaderUtils>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  margin: 0 auto;
  @media (min-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    max-width: ${MEDIA_QUERY_END_POINT.TABLET};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.LARGE}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    max-width: ${MEDIA_QUERY_END_POINT.LARGE};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.XLARGE}) {
    grid-template-columns: repeat(5, 1fr);
    gap: 32px;
    max-width: 1728px;
  }
`;

const HeaderUtils = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  color: rgb(52, 58, 64);
  & > *:not(:last-child) {
    margin-right: 12px;
  }
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  margin-top: 6px;
`;

const SearchBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:hover,
  &:focus {
    border-radius: 50%;
    background: #f2f2f2;
  }
`;
const UserUtils = styled.article`
  cursor: pointer;
  display: flex;
  align-items: center;
  svg:hover {
    fill: #000;
  }
`;

const UserProfile = styled(Image)`
  border-radius: 50%;
`;

const NewPostBtn = styled.button`
  height: 32px;
  padding: 1px 16px;
  border-radius: 16px;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  word-break: keep-all;
  background: white;
  border: 1px solid rgb(52, 58, 64);
  color: rgb(52, 58, 64);
  transition: all 0.125s ease-in 0s;
  &:hover,
  &:focus {
    color: #fff;
    background: #000;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
