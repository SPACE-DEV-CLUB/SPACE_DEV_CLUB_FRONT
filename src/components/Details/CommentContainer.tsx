import styled from "@emotion/styled"
import { useState } from "react"
import { Comment } from "./Comment"

interface Comments {
  comments: {
    id: number
    attributes: {
      userid: number
      postid: number
      content: string
      createdAt: string
      depth: number
      order: number
      group: number
      is_deleted: boolean
    }
  }
  userData: [
    {
      id: number
      attributes: {
        userid: string
        profileimage: string
      }
    }
  ]
  commentBtn: boolean
}

let user = {
  id: 0,
  attributes: {
    userid: "",
    profileimage: "",
  },
}

export const CommentContainer = ({
  comments,
  userData,
  commentBtn,
}: Comments) => {
  const depth = comments.attributes.depth

  userData.some((data) => {
    if (data.id === comments.attributes.userid) {
      user = data
      return true
    }
  })

  return (
    <Container>
      <h3 className="sr-only">상세 페이지에 생성된 댓글</h3>
      {depth === 0 && <Comment comments={comments} user={user} />}
      {depth === 1 && commentBtn === true && (
        <Comcom>
          <Comment comments={comments} user={user} />
        </Comcom>
      )}

      {/* {other.length === 0 ? (
        <div></div>
      ) : (
        <CommentPlus theme={theme}>
          <BorderInnerIcon className="comment-plus" />
          {other.length}개의 답글
        </CommentPlus>
      )} */}
    </Container>
  )
}

const Container = styled.article`
  width: 100%;
`
const Comcom = styled.div`
  margin-left: 40px;
`
