import styled from "@emotion/styled";
import { UDHashContainer } from "./UDHashContainer";
import { SeriesContainer } from "./SeriesContainer";
import { Intro } from "../MyPage";
import { Carousel } from "./Carousel";
import { CommentFormContainer } from "./Comment";
import useIO from "../../hooks/useIO";
import { API_ENDPOINT } from "../../constants";
import axios, { Method } from "axios";
import { userInfo } from "../../types/Main";
import { Hashtags } from "../../pages/[id]/[details]";

interface Comments {
  id: number;
  attributes: {
    userid: number;
    postid: number;
    content: string;
    createdAt: string;
    depth: number;
    order: number;
    group: number;
    is_deleted: boolean;
  };
}

interface DetailData {
  title: string;
  contents: string;
  userName: string | string[] | undefined;
  createdAt: string;
  postid: number;
  comments: Comments[];
  userdata: userInfo;
  hashtags: Hashtags[];
  loginUserId: number | undefined;
  loginUserName: string | string[] | undefined;
}

interface ReadingPost {
  id: number;
  attributes: {
    postid: {
      data: {
        id: number;
      };
    };
  };
}

export const DetailHeader = ({
  title,
  contents,
  userName,
  comments,
  postid,
  createdAt,
  userdata,
  hashtags,
  loginUserId,
  loginUserName,
}: DetailData) => {
  const getReadingData = async () => {
    let putId = 0;
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/readingposts?populate=*&filters[userid][userid]=${loginUserName}`,
    });
    const handleOverlap = response.data.data.some((post: ReadingPost) => {
      if (post.attributes.postid.data.id === postid) {
        putId = post.id;
        return true;
      }
    });
    handleOverlap
      ? postReadingData("put", `${putId}`)
      : postReadingData("post");
  };

  const postReadingData = async (method: string, putid: string = "") => {
    axios({
      method: method as Method,
      url: `${API_ENDPOINT}/readingposts/${putid}`,
      data: {
        data: {
          userid: loginUserId,
          postid: postid,
        },
      },
    }).then(function (response) {
      console.log(response);
      console.log(`method : ${method}`);
      console.log(`data-id : ${putid}`);
      console.log(`post-id : ${postid}`);
    });
  };

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      loginUserId && getReadingData();
    }
  };

  const { setTarget } = useIO({
    root: null,
    rootMargin: "0px",
    threshold: 1,
    onIntersect,
  });

  return (
    <Header>
      <h2>{title}</h2>
      <UDHashContainer
        userName={userName}
        createdAt={createdAt}
        hashtags={hashtags}
      />
      <SeriesContainer />
      <div>{contents}</div>
      <div ref={setTarget}></div>
      <Intro username={userName} userdata={userdata} />
      <Carousel />
      <CommentFormContainer comments={comments} />
    </Header>
  );
};

const Header = styled.section`
  display: flex;
  width: 768px;
  margin: 0 3vw;
  flex-direction: column;
  margin-top: 32px;
  h2 {
    font-size: 48px;
    margin-bottom: 32px;
  }
  @media screen and (max-width: 840px) {
    width: 100vw;
  }
`;
