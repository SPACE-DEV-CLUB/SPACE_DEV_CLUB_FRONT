import styled from "@emotion/styled";
import { CommentUser } from "./CommentUser";
import { PALLETS_LIGHT } from "../../constants";

import { Theme } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";

import { useData } from "../../hooks/useData";

interface ThemeProps {
  theme: Theme;
}

interface Comments {
  comments: {
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
  }[];
}

export const Comment = ({ comments }: Comments) => {
  const { theme } = useContext(ThemeContext);

  comments.sort((a, b) => {
    return a.attributes.group < b.attributes.group
      ? -1
      : a.attributes.group > b.attributes.group
      ? 1
      : 0;
  });

  const { data: userData, error: UserError } = useData("userinfos");

  if (!userData) return <div>로딩중</div>;
  if (UserError) return <div>에러</div>;

  return (
    <article>
      <h3 className="sr-only">상세 페이지 댓글</h3>
      <CommentForm action="">
        <CommentNum>{comments.length}개의 댓글</CommentNum>
        <TextArea
          theme={theme}
          name="댓글 입력"
          placeholder="댓글을 작성하세요"
        ></TextArea>
        <BtnContainer>
          <CommentBtn type="submit">댓글 작성</CommentBtn>
        </BtnContainer>
      </CommentForm>
      {comments.map((comments) => {
        return (
          <CommentUser
            key={`CommentUser-${comments.id}`}
            comments={comments}
            userData={userData.data}
          />
        );
      })}
    </article>
  );
};

const CommentForm = styled.form`
  width: 100%;
`;
const CommentNum = styled.h4`
  font-size: 18px;
  margin: 24px 0;
`;
const TextArea = styled.textarea<ThemeProps>`
  resize: none;
  padding: 20px 20px 30px;
  outline: none;
  border: 1px solid ${PALLETS_LIGHT.SUB};
  background-color: ${({ theme }) => theme.CARD_BACKGROUND};
  margin-bottom: 1.5rem;
  width: 95%;
  border-radius: 4px;
  min-height: 90px;
  font-size: 16px;
  color: ${({ theme }) => theme.SUB_FONT};
  line-height: 1.75;
  ::placeholder {
    color: ${PALLETS_LIGHT.ICON};
  }
`;
const BtnContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: end;
  padding-left: 45px;
`;
const CommentBtn = styled.button`
  font-weight: bold;
  cursor: pointer;
  background: ${PALLETS_LIGHT.MAIN};
  color: white;
  border-radius: 4px;
  padding: 0px 20px;
  height: 32px;
  font-size: 16px;
  :hover {
    opacity: 0.9;
  }
`;
