import styled from "@emotion/styled";
import { API_ENDPOINT } from "@src/constants";
import { CommentData } from "@src/types/Detail";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comment } from ".";

interface Props {
  comment: CommentData;
  commentBtn: boolean[];
  index: number;
  loginUserId?: number;
}

export const CommentContainer = ({
  comment,
  commentBtn,
  index,
  loginUserId,
}: Props) => {
  const depth = comment.attributes.depth;

  const [user, setUser] = useState({
    id: 0,
    attributes: {
      userid: "",
      profileimage: "",
    },
  });

  const getUserData = async () => {
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/userinfos?populate=*&filters[id]=${comment.attributes.userid}`,
    });
    setUser(response.data.data[0]);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <h3 className="sr-only">상세 페이지에 생성된 댓글</h3>
      {depth === 0 && (
        <Comment comment={comment} user={user} loginUserId={loginUserId} />
      )}
      {depth === 1 && commentBtn[index] === true && (
        <Comcom>
          <Comment comment={comment} user={user} loginUserId={loginUserId} />
        </Comcom>
      )}
    </Container>
  );
};

const Container = styled.article`
  width: 100%;
`;
const Comcom = styled.div`
  margin-left: 40px;
`;
