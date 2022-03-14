import styled from "@emotion/styled";
import Link from "next/link";

import { Theme } from "@styles/theme";
import { useContext, useState } from "react";
import { ThemeContext } from "@pages/_app";

import { handleDate } from "@utils/date";
import { Modal } from "@src/components/Common/Modal";

import { Tag } from "../../Common/Tag";
import { PostContext } from "@pages/[id]/[details]";
import { useRouter } from "next/router";
import axios, { Method } from "axios";
import { API_ENDPOINT } from "@src/constants";
import { CommentData } from "@src/types/Detail";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  userName: string | string[] | undefined;
  loginUserId?: number;
}

export const UDHashContainer = ({ userName, loginUserId }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { postObj, postid } = useContext(PostContext);
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();

  const onClickDelete = () => {
    setIsDelete(true);
  };

  const onClickNo = () => {
    setIsDelete(false);
    document.body.style.overflow = "unset";
  };

  const Delete = async (id: number) => {
    await axios({
      method: "delete" as Method,
      url: `${API_ENDPOINT}/comments/${id}`,
    });
  };

  const onClickYes = async () => {
    const res = await axios({
      method: "get" as Method,
      url: `${API_ENDPOINT}/comments?populate=*&filters[posts][id]=${postid}`,
    });
    res.data.data.forEach((data: CommentData) => Delete(data.id));
    await axios({
      method: "delete" as Method,
      url: `${API_ENDPOINT}/posts/${postid}`,
    });
    router.push("/");
    document.body.style.overflow = "unset";
  };

  const onClickNickname = () => {
    router.push(`/${userName}`);
  };

  return (
    <article>
      <h2 className="sr-only">해시태그 및 글 수정, 삭제</h2>
      <UDContainer>
        <div>
          <Nickname theme={theme} onClick={onClickNickname}>
            {userName}
          </Nickname>
          <CreatedAt theme={theme}>{handleDate(postObj.createdAt)}</CreatedAt>
        </div>
        {loginUserId === postObj.userid.data.id && (
          <div>
            {/* <Link href="#" passHref>
              <UDItem theme={theme}>통계</UDItem>
            </Link> */}
            <Link href="#" passHref>
              <UDItem theme={theme}>수정</UDItem>
            </Link>
            <UDItem onClick={onClickDelete} type="button" theme={theme}>
              삭제
            </UDItem>
          </div>
        )}
      </UDContainer>
      {postObj.hashtags.data.map((tag) => {
        return (
          <Tag key={`Detail_tag_${tag.id}`} tagName={tag.attributes.name}></Tag>
        );
      })}
      {isDelete && (
        <Modal
          title="포스트 삭제"
          handleOK={onClickYes}
          check={isDelete}
          handleCancel={onClickNo}
        >
          정말로 삭제하시겠습니까?
        </Modal>
      )}
    </article>
  );
};

const UDContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Nickname = styled.span<ThemeProps>`
  color: ${({ theme }) => theme.MAIN_FONT};
  cursor: pointer;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;
const CreatedAt = styled.span<ThemeProps>`
  color: ${({ theme }) => theme.SUB_FONT};
  margin-left: 8px;
  &::before {
    content: "·";
    margin-right: 8px;
    color: ${({ theme }) => theme.SUB_FONT};
  }
`;
const UDItem = styled.button<ThemeProps>`
  color: ${({ theme }) => theme.ICON};
  font-weight: 500;
  margin-right: 7px;
  &:hover {
    color: ${({ theme }) => theme.SUB_FONT};
  }
`;
