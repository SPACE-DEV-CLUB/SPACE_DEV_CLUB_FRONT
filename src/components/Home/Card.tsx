import styled from '@emotion/styled';
import Link from 'next/link';
import { PALLETS_LIGHT } from '../../constants';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image';
import SAMPLE_IMG from '../../../public/image/sampleUser2.jpg';

export const PostCard = () => {
  return (
    <Card>
      <Link href="/" passHref>
        <a>
          <Thumbnail src="https://media.vlpt.us/images/deli-ght/post/311d6156-aca9-479a-8960-06f064f52dad/ts%E1%84%91%E1%85%AD%E1%84%8C%E1%85%B5.png"></Thumbnail>

          <Contents>
            <h4>React.FC vs JSX.Element</h4>
            <p>
              props에 기본적으로 children이 들어있음. 하지만 children이 옵션으로
              들어가 있어, 컴포넌트 props의 타입이 정할 수 없는 단점이 있음.
              children의 요소로 어떤 타입이 들어올 지 모르기 때문 defaultProps,
              propTypes, contextTypes 자동완성. const로 선언되는 컴포넌트를
              변수로 생각하지 못하도록 React.FC로 타입을 지정해줌.
            </p>
            <div>
              <span>2022년 1월 6일</span>
              <Dot>&#183;</Dot>
              <span>3개의 댓글</span>
            </div>
          </Contents>
        </a>
      </Link>
      <Desc>
        <Link href="/" passHref>
          <Author>
            <Profileimg
              src={SAMPLE_IMG}
              alt=""
              width={24}
              height={24}
            ></Profileimg>
            <span>
              by
              <strong> deli-ght</strong>
            </span>
          </Author>
        </Link>
        <Like>
          <FavoriteIcon />
          <span>99</span>
        </Like>
      </Desc>
    </Card>
  );
};

const Card = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${PALLETS_LIGHT.CARD_BACKGROUND};
  border-radius: 14px;
  transition: ease-in-out 0.25s;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  &:hover {
    transform: translateY(-5px);
    box-shadow: rgba(0 0 0 / 0.3) 0px 4px 16px 0px;
  }
`;

const Thumbnail = styled.img`
  display: block;
  width: 100%;
`;

const Contents = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 16px;
  h4 {
    color: ${PALLETS_LIGHT.MAIN_FONT};
    font-size: 16px;
    line-height: 1.5;
    font-weight: 700;
    margin-bottom: 4px;
    word-break: break-word;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  p {
    font-size: 14px;
    color: ${PALLETS_LIGHT.SUB_FONT};
    line-height: 1.5;
    margin-bottom: 24px;
    word-break: break-word;
    overflow-wrap: break-word;
    height: 63px;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  span {
    line-height: 1.5;
    font-size: 12px;
    color: ${PALLETS_LIGHT.POINT_FONT};
  }
`;

const Dot = styled.span`
  margin: 0 4px;
`;

const Desc = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  line-height: 1.5;
`;

const Profileimg = styled(Image)`
  display: block;
  border-radius: 50%;
`;

const Author = styled.a`
  display: flex;
  align-items: center;

  span {
    color: ${PALLETS_LIGHT.POINT_FONT};
    font-size: 12px;
    margin-left: 8px;
    strong {
      color: ${PALLETS_LIGHT.MAIN_FONT};
    }
  }
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
    width: 12px;
    height: 12px;
    fill: ${PALLETS_LIGHT.MAIN};
  }
  font-size: 12px;
  color: ${PALLETS_LIGHT.MAIN};
`;
