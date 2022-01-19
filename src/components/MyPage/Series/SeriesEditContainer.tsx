import styled from "@emotion/styled"
import DetailCard from "../../../components/MyPage/Series/DetailCard"
import { DETAIL_CARD_DATA } from "../../../data"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { useState } from "react"
import { DetailCardProps } from "../../../types/Main"
import React from "react"
import DraggableItem from "./DraggableItem"
import { useContext } from "react"
import { ThemeContext } from "../../../pages/_app"
import { ThemeProps } from "../../../types/Theme"

interface SeriesContainerProps {
  handleEdit: () => void
}

const SeriesEditContainer = ({ handleEdit }: SeriesContainerProps) => {
  const { theme } = useContext(ThemeContext)

  const getItems = (count: number) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `Item ${k + 1}`,
      postIdx: DETAIL_CARD_DATA[k].postIdx, //e.postIdx
      postTitle: DETAIL_CARD_DATA[k].postTitle,
      postDesc: DETAIL_CARD_DATA[k].postDesc,
      date: DETAIL_CARD_DATA[k].date,
    }))

  const [state, setState] = useState<DetailCardProps[]>(
    getItems(DETAIL_CARD_DATA.length)
  )

  const reorder = (
    list: DetailCardProps[],
    startIndex: number,
    endIndex: number
  ): DetailCardProps[] => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const getItemStyle = (isDragging: boolean, draggableStyle?: any) => ({
    userSelect: "none",
    marginTop: "36px",
    padding: "24px",
    background: isDragging ? `${theme.SUB}` : `${theme.SUBBACKGROUND}`,
    borderRadius: "4px",
    ...draggableStyle,
  })

  const onDragEnd = ({ destination, source }: DropResult): void => {
    // dropped outside the list
    if (!destination) return
    const newItems = reorder(state, source.index, destination.index)
    setState(newItems)
  }
  return (
    <SeriesContainer>
      <SaveBtnContainer>
        <SaveBtn theme={theme} onClick={handleEdit}>
          저장
        </SaveBtn>
      </SaveBtnContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <CardContainer theme={theme} droppableId="droppable">
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getItemStyle(snapshot.isDraggingOver)}
              >
                {state.map((e, i) => (
                  <DraggableItem key={`${e}_${i}`} e={e} i={i} />
                ))}
                {provided.placeholder}
              </div>
            )
          }}
        </CardContainer>
      </DragDropContext>
    </SeriesContainer>
  )
}

const SeriesContainer = styled.section``

const SaveBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const SaveBtn = styled.button<ThemeProps>`
  height: 32px;
  padding: 0 20px;
  border-radius: 4px;
  background: ${({ theme }) => theme.SUB};
  color: ${({ theme }) => theme.SUB_FONT};
  &:hover {
    background: ${({ theme }) => theme.MAIN};
    color: ${({ theme }) => theme.MAIN_FONT};
  }
`

const CardContainer = styled(Droppable)<ThemeProps>`
  margin-top: 36px;
  padding: 24px;
  background: ${({ theme }) => theme.BACKGROUND};
  border-radius: 4px;
`

export default SeriesEditContainer
