import styled from "@emotion/styled";
import { Comment, CommentData } from ".";

export interface CommentUser {
  id: number;
  attributes: {
    userid: string;
    profileimage: string;
  };
}

interface Props {
  comments: CommentData;
  userData: CommentUser[];
  commentBtn: boolean[];
  index: number;
  loginUserId?: number;
}

let user = {
  id: 0,
  attributes: {
    userid: "",
    profileimage: "",
  },
};

export const CommentContainer = ({
  comments,
  userData,
  commentBtn,
  index,
  loginUserId,
}: Props) => {
  const depth = comments.attributes.depth;

  userData.some((data) => {
    if (data.id === comments.attributes.userid) {
      user = data;
      return true;
    }
  });

  return (
    <Container>
      <h3 className="sr-only">상세 페이지에 생성된 댓글</h3>
      {depth === 0 && (
        <Comment comments={comments} user={user} loginUserId={loginUserId} />
      )}
      {depth === 1 && commentBtn[index] === true && (
        <Comcom>
          <Comment comments={comments} user={user} loginUserId={loginUserId} />
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
