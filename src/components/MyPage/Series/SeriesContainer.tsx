import styled from "@emotion/styled"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { css } from "@emotion/react"
import DetailCard from "../../../components/MyPage/Series/DetailCard"
import { DETAIL_CARD_DATA } from "../../../data"
import { Theme } from "../../../styles/theme"
import { useContext } from "react"
import { ThemeContext } from "../../../pages/_app"
import { ThemeProps } from "../../../types/Theme"

interface SeriesContainerProps {
  handleEdit: () => void
  handleOrder: () => void
  order: boolean
}

const SeriesContaienr = ({
  handleEdit,
  handleOrder,
  order,
}: SeriesContainerProps) => {
  const { theme } = useContext(ThemeContext)
  return (
    <SeriesContainer>
      <EditBtnContainer>
        <EditBtn theme={theme} onClick={handleEdit}>
          수정
        </EditBtn>
        <EditBtn theme={theme}>삭제</EditBtn>
      </EditBtnContainer>
      <OrderBtnContainer>
        <OrderBtn theme={theme} onClick={handleOrder}>
          <ArrowIcon theme={theme} orderlist={order} />
          {order ? <Order>오름차순</Order> : <Order>내림차순</Order>}
        </OrderBtn>
      </OrderBtnContainer>
      <CardContainer>
        {order
          ? DETAIL_CARD_DATA.map((e, i) => {
              return (
                <DetailCard
                  key={i}
                  margin={"64px 0 0 0"}
                  padding={"16px"}
                  postIdx={e.postIdx}
                  postTitle={e.postTitle}
                  postDesc={e.postDesc}
                  date={e.date}
                />
              )
            }).reverse()
          : DETAIL_CARD_DATA.map((e, i) => {
              return (
                <DetailCard
                  key={i}
                  margin={"64px 0 0 0"}
                  padding={"16px"}
                  postIdx={e.postIdx}
                  postTitle={e.postTitle}
                  postDesc={e.postDesc}
                  date={e.date}
                />
              )
            })}
      </CardContainer>
    </SeriesContainer>
  )
}

const SeriesContainer = styled.section``

const EditBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const EditBtn = styled.button<ThemeProps>`
  color: ${({ theme }) => theme.SUB_FONT};
  font-size: 16px;
  & + & {
    margin-left: 8px;
  }
  &:hover {
    color: ${({ theme }) => theme.MAIN_FONT};
  }
`

const OrderBtnContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`

interface IconType {
  orderlist: boolean
  theme: Theme
}

const iconOrder = (props: IconType) => css`
  transform: ${props.orderlist ? "rotate(0deg)" : "rotate(-180deg)"};
  transition: transform 0.5s linear;
`

const ArrowIcon = styled(KeyboardArrowUpIcon)`
  ${iconOrder};
  color: ${({ theme }) => theme.MAIN};
`

const OrderBtn = styled.button<ThemeProps>`
  padding: 1px 8px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  background: ${({ theme }) => theme.SUBBACKGROUND};
  color: ${({ theme }) => theme.MAIN_FONT};
  &:hover {
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
  }
`

const Order = styled.span`
  margin-left: 4px;
  padding-top: 2px;
  line-height: 1.5;
  font-size: 16px;
  vertical-align: middle;
`
const CardContainer = styled.article``

export default SeriesContaienr
