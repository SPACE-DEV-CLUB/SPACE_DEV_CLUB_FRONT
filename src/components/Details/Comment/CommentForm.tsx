import styled from "@emotion/styled";
import { API_ENDPOINT, PALLETS_LIGHT } from "@constants/index";

import { Theme } from "@styles/theme";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@pages/_app";
import axios, { Method } from "axios";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  postid: number;
  loginUserId?: number;
  CommentLen: number;
}

export const CommentForm = ({ postid, loginUserId, CommentLen }: Props) => {
  const { theme } = useContext(ThemeContext);
  const [commentText, setCommentText] = useState("");

  const SubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setCommentText("");
    await axios({
      method: "post" as Method,
      url: `${API_ENDPOINT}/comments`,
      data: {
        data: {
          userid: loginUserId,
          postid: postid,
          content: commentText,
          depth: 0,
          order: 0,
          group: CommentLen,
          is_deleted: false,
          posts: postid,
        },
      },
    });
  };

  const ChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <article>
      <h3 className="sr-only">상세 페이지 댓글 입력 폼</h3>
      <CommentF onSubmit={SubmitComment}>
        <TextArea
          theme={theme}
          name="댓글 입력"
          placeholder="댓글을 작성하세요"
          onChange={ChangeText}
        ></TextArea>
        <BtnContainer>
          <CommentBtn theme={theme} type="submit">
            댓글 작성
          </CommentBtn>
        </BtnContainer>
      </CommentF>
    </article>
  );
};

const CommentF = styled.form`
  width: 100%;
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
const CommentBtn = styled.button<ThemeProps>`
  font-weight: bold;
  cursor: pointer;
  background: ${({ theme }) => theme.MAIN};
  color: ${({ theme }) => theme.SUB};
  border-radius: 4px;
  padding: 0px 20px;
  height: 32px;
  font-size: 16px;
  :hover {
    opacity: 0.9;
  }
`;
