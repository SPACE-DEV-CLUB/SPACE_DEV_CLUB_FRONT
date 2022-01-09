import styled from "@emotion/styled"
import { useState } from "react"
import Image from "next/image"
import { MEDIA_QUERY_END_POINT, PALLETS_LIGHT } from "../../../constants"

export const SelfIntro = () => {
  let [mode, setMode] = useState(false)
  let [data, setData] = useState(false)

  const handleEdit = () => {
    setMode(!mode)
  }

  return (
    <EditorContainer>
      {/* 데이터가 있다면 소개글 보여주기 */}
      {data ? (
        mode ? (
          <>
            <EditBtnBox>
              <EditBtn onClick={handleEdit}>수정하기</EditBtn>
            </EditBtnBox>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae harum sunt, atque itaque modi doloremque, laboriosam
              nihil numquam facere quisquam amet optio voluptate fugit,
              distinctio temporibus illum dignissimos iusto! Recusandae.
            </p>
          </>
        ) : (
          <>
            <EditBtnBox>
              <EditBtn onClick={handleEdit}>저장하기</EditBtn>
            </EditBtnBox>
          </>
        )
      ) : (
        <>
          <DefaultContainer>
            <Image
              src="/image/mypage_selfintro.jpg"
              alt="self_default"
              width={300}
              height={300}
            />
            <EditBtn>소개 글 작성하기</EditBtn>
          </DefaultContainer>
        </>
      )}
    </EditorContainer>
  )
}

const EditorContainer = styled.section`
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    padding: 0 16px;
  }
`

const EditBtnBox = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 24px;
`

const EditBtn = styled.button`
  height: 40px;
  padding: 0 18px;
  background: ${PALLETS_LIGHT.MAIN};
  color: #fff;
  border-radius: 4px;
`
const DefaultContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
