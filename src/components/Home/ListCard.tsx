import styled from '@emotion/styled';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext } from 'react';
import { Theme } from '@styles/theme';
import { ThemeContext } from '@pages/_app';
import { handleDate } from '@utils/date';
interface ThemeProps {
  theme: Theme;
}
interface Cardprops {
  title: string;
  contents: string;
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
  contents,
  comments,
  username,
  count,
  thumbnail,
  publishedAt,
  url,
  userImg
} : Cardprops) => {
  const { theme } = useContext(ThemeContext);

  const handleThumbnailError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = '/image/default_thumbnail.png';
    event.currentTarget.style.transform = "scale(0.8)";
  };

  const handleAuthorImgError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = '/image/junghoon_memoji.png';
    event.currentTarget.style.transform = "scale(1.2)";
  };

  return (
    <Card theme={theme}>
      <Link href={`/${username}/${url}`} passHref>
        <a>
          <ThumbnailWrap>
            <Thumbnail src={''} alt="" onError={handleThumbnailError}/>
          </ThumbnailWrap>
          <Post theme={theme}>
            <PostTitle theme={theme}>{title}</PostTitle>
            <PostContent theme={theme}>{contents}</PostContent>
            <div>
              <PostDesc theme={theme}>{handleDate(publishedAt)}</PostDesc>
              <Dot>&#183;</Dot>
              <PostDesc theme={theme}>{comments || 0}개의 댓글</PostDesc>
            </div>
          </Post>
        </a>
      </Link>
      <AuthorDesc theme={theme}>
        <Link href={`/${username}`} passHref>
          <Author theme={theme}>
            <AuthorImg
              src={userImg}
              alt=""
              width={24}
              height={24}
              onError={handleAuthorImgError}
            ></AuthorImg>
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

const Post = styled.section<ThemeProps>`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
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
-webkit-line-clamp: 3;
overflow: hidden;
`;

const PostDesc = styled.span<ThemeProps>` 
  color: ${({ theme }) => theme.POINT_FONT}; 
  line-height: 1.5;
  font-size: 12px;
`;

const ThumbnailWrap= styled.section`
  position: relative;
  padding-top: 52%;
  background: white;
`;

const Thumbnail = styled.img`
  width: 100%;
  height:100%;
  position: absolute;
  top:0;  
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

const  AuthorImg = styled.img`
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
