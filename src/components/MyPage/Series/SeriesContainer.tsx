import styled from "@emotion/styled"
import { PALLETS_LIGHT } from "../../../constants"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import { css } from "@emotion/react"
import DetailCard from "../../../components/MyPage/Series/DetailCard"
import { DETAIL_CARD_DATA } from "../../../data"

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
  return (
    <SeriesContainer>
      <EditBtnContainer>
        <EditBtn onClick={handleEdit}>수정</EditBtn>
        <EditBtn>삭제</EditBtn>
      </EditBtnContainer>
      <OrderBtnContainer>
        <OrderBtn onClick={handleOrder}>
          <ArrowIcon orderlist={order} />
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
const EditBtn = styled.button`
  color: ${PALLETS_LIGHT.SUB_FONT};
  font-size: 16px;
  & + & {
    margin-left: 8px;
  }
  &:hover {
    color: ${PALLETS_LIGHT.MAIN_FONT};
  }
`

const OrderBtnContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`

interface IconType {
  orderlist: boolean
}

const iconOrder = (props: IconType) => css`
  transform: ${props.orderlist ? "rotate(0deg)" : "rotate(-180deg)"};
  transition: transform 0.5s linear;
`

const ArrowIcon = styled(KeyboardArrowUpIcon)`
  ${iconOrder};
  color: ${PALLETS_LIGHT.MAIN};
`

const OrderBtn = styled.button`
  padding: 1px 8px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  background: #f1f3f5;
  &:hover {
    background: ${PALLETS_LIGHT.BACKGROUND};
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
