import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useState } from "react"
import { Header } from "../../../components/Common/Header"
import SeriesContaienr from "../../../components/MyPage/Series/SeriesContainer"
import SeriesEditContainer from "../../../components/MyPage/Series/SeriesEditContainer"
import { useContext } from "react"
import { ThemeContext } from "../../../pages/_app"
import { ThemeProps } from "../../../types/Theme"

const Series = () => {
  const { theme } = useContext(ThemeContext)
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
        <SeriesLogo theme={theme}>시리즈</SeriesLogo>
        <SeriesTitle theme={theme} contentEditable={editTitle}>
          {title}
        </SeriesTitle>
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

const SeriesLogo = styled.span<ThemeProps>`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.MAIN};
  border-bottom: 4px solid ${({ theme }) => theme.MAIN};
`

const SeriesTitle = styled.h1<ThemeProps>`
  padding: 16px 0 24px 0;
  margin-bottom: 24px;
  line-height: 1.5;
  border-bottom: 1px solid ${({ theme }) => theme.BORDER};
  font-size: 48px;
`
