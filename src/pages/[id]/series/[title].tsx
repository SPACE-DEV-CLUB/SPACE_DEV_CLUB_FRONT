import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useState } from "react"
import { Header } from "../../../components/MyPage"
import SeriesContaienr from "../../../components/MyPage/Series/SeriesContainer"
import SeriesEditContainer from "../../../components/MyPage/Series/SeriesEditContainer"
import { PALLETS_LIGHT } from "../../../constants"

const Series = () => {
  const router = useRouter()
  const { id, title } = router.query

  const [editTitle, setEditTitle] = useState(false)
  const [order, setOrder] = useState(false)

  const handleOrder = () => {
    setOrder(!order)
  }

  const handleEdit = () => {
    setEditTitle(!editTitle)
  }
  return (
    <>
      <Header username={id} user={true} />
      <Main>
        <SeriesLogo>시리즈</SeriesLogo>
        <SeriesTitle contentEditable={editTitle}>{title}</SeriesTitle>
        {editTitle ? (
          <SeriesEditContainer handleEdit={handleEdit} />
        ) : (
          <SeriesContaienr
            handleEdit={handleEdit}
            handleOrder={handleOrder}
            order={order}
          />
        )}
      </Main>
    </>
  )
}

export default Series

const Main = styled.main`
  box-sizing: border-box;
  width: 768px;
  margin: 32px auto 0;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 16px;
  }
`

const SeriesLogo = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${PALLETS_LIGHT.MAIN};
  border-bottom: 4px solid ${PALLETS_LIGHT.MAIN};
`

const SeriesTitle = styled.h1`
  padding: 16px 0 24px 0;
  margin-bottom: 24px;
  line-height: 1.5;
  border-bottom: 1px solid #dee2e6;
  font-size: 48px;
`
