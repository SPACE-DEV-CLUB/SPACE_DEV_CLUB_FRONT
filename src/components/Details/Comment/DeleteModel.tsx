import React, { Dispatch, SetStateAction } from "react";
import styled from "@emotion/styled";

import { Theme } from "@styles/theme";
import { useContext, useState } from "react";
import { ThemeContext } from "@pages/_app";
import axios, { Method } from "axios";
import { API_ENDPOINT } from "@src/constants";
import { useSWRConfig } from "swr";
import { CommentData } from ".";
import { PostContext } from "@src/pages/[id]/[details]";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  comments: CommentData;
}

export const DeleteModel = ({ setIsDelete, comments }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { postObj } = useContext(PostContext);
  const { mutate } = useSWRConfig();

  const Delete = async (id: number) => {
    await axios({
      method: "delete" as Method,
      url: `${API_ENDPOINT}/comments/${id}`,
    });
    mutate(`${API_ENDPOINT}/posts?populate=*`);
  };

  const onClickNo = () => {
    setIsDelete(false);
    document.body.style.overflow = "unset";
  };

  const onClickYes = async () => {
    if (comments.attributes.depth === 0) {
      const everyComment = postObj.comments.data.filter(
        (group) => group.attributes.group === comments.attributes.group
      );
      everyComment.forEach((data) => Delete(data.id));
    } else {
      Delete(comments.id);
    }
    document.body.style.overflow = "unset";
  };

  return (
    <ModelBack theme={theme}>
      <IsDelModel theme={theme}>
        <Title>댓글 삭제</Title>
        <Desc>댓글을 정말로 삭제하시겠습니까?</Desc>
        <BtnContainer>
          <NoBtn onClick={onClickNo} theme={theme} type="button">
            취소
          </NoBtn>
          <YesBtn onClick={onClickYes} theme={theme} type="button">
            확인
          </YesBtn>
        </BtnContainer>
      </IsDelModel>
    </ModelBack>
  );
};

const ModelBack = styled.div<ThemeProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.ModelRGBA};
`;
const IsDelModel = styled.article<ThemeProps>`
  padding: 2rem;
  box-sizing: border-box;
  position: absolute;
  top: 45%;
  left: 35%;
  background-color: ${({ theme }) => theme.BACKGROUND};
  width: 25rem;
  height: 12rem;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
`;
const Title = styled.h4`
  line-height: 1.5;
  font-weight: bold;
  font-size: 1.5rem;
`;
const Desc = styled.p`
  line-height: 1.5;
  margin: 15px 0px 25px 0px;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const NoBtn = styled.button<ThemeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.BACKGROUND};
  color: ${({ theme }) => theme.MAIN};
  &:hover {
    opacity: 0.7;
  }
`;
const YesBtn = styled.button<ThemeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.BACKGROUND};
  background-color: ${({ theme }) => theme.MAIN};
  &:hover {
    opacity: 0.7;
  }
`;
