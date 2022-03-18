import styled from "@emotion/styled";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { Theme } from "@styles/theme";
import { ThemeContext } from "@pages/_app";
import { handleDate } from "@utils/date";
interface ThemeProps {
  theme: Theme;
}
interface Cardprops {
  title: string;
  description: string;
  comments?: number;
  username?: string | string[] | undefined;
  count?: number;
  thumbnail?: string;
  publishedAt: string;
  url: string;
  userImg: string | undefined;
}

export const ListCard = ({
  title,
  description,
  comments,
  username,
  count,
  thumbnail,
  publishedAt,
  url,
  userImg,
}: Cardprops) => {
  const { theme } = useContext(ThemeContext);

  const handleAuthorImgError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "/image/sampleUser.jpg";
    event.currentTarget.style.transform = "translateY(-3px)";
  };

  return (
    <Card theme={theme}>
      <PostSection>
        <Link href={`/${username}/${url}`} passHref>
          <a>
            {thumbnail && (
              <ThumbnailWrap theme={theme}>
                <Thumbnail src={""} alt="" />
              </ThumbnailWrap>
            )}
            <PostTitle theme={theme}>{title}</PostTitle>
            <PostContent theme={theme}>{description}</PostContent>
          </a>
        </Link>
        <div>
          <PostDesc theme={theme}>{handleDate(publishedAt)}</PostDesc>
          <Dot>&#183;</Dot>
          <PostDesc theme={theme}>{comments || 0}개의 댓글</PostDesc>
        </div>
      </PostSection>
      <AuthorDesc theme={theme}>
        <Link href={`/${username}`} passHref>
          <Author theme={theme}>
            <Preposition theme={theme}>
              by
              <AuthorName theme={theme}> {username}</AuthorName>
            </Preposition>
          </Author>
        </Link>
        <Like theme={theme}>
          <FavoriteIcon />
          <span>{count}</span>
        </Like>
      </AuthorDesc>
    </Card>
  );
};

const Card = styled.article<ThemeProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.CARD_BACKGROUND};
  border-radius: 4px;
  transition: ease-in-out 0.25s;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: rgba(0 0 0 / 0.3) 0px 4px 16px 0px;
  }
`;

const PostSection = styled.section`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  overflow: hidden;
`;

const PostTitle = styled.h4<ThemeProps>`
  color: ${({ theme }) => theme.MAIN_FONT};
  font-size: 16px;
  line-height: 1.5;
  font-weight: 700;
  margin-bottom: 4px;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const PostContent = styled.p<ThemeProps>`
  color: ${({ theme }) => theme.SUB_FONT};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 24px;
  word-break: break-word;
  overflow-wrap: break-word;
  height: 63px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostDesc = styled.span<ThemeProps>`
  color: ${({ theme }) => theme.POINT_FONT};
  line-height: 1.5;
  font-size: 12px;
`;

const ThumbnailWrap = styled.section<ThemeProps>`
  position: relative;
  padding-top: 52%;
  background: ${({ theme }) => theme.CARD_BACKGROUND};
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  object-fit: contain;
`;

const Dot = styled.span`
  margin: 0 4px;
`;

const AuthorDesc = styled.footer<ThemeProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  line-height: 1.5;
  border-top: 1px solid ${({ theme }) => theme.TOGGLE_BACKGROUND};
`;

const AuthorImg = styled.img`
  display: block;
  border-radius: 50%;
  object-fit: cover;
`;

const Author = styled.a<ThemeProps>`
  display: flex;
  align-items: center;
`;

const Preposition = styled.span<ThemeProps>`
  color: ${({ theme }) => theme.POINT_FONT};
  font-size: 12px;
  margin-left: 8px;
`;

const AuthorName = styled.strong<ThemeProps>`
  color: ${({ theme }) => theme.MAIN_FONT};
`;

const Like = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
    width: 12px;
    height: 12px;
    fill: ${({ theme }) => theme.MAIN};
  }
  font-size: 12px;
  color: ${({ theme }) => theme.MAIN_FONT};
`;
