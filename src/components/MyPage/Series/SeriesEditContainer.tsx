import styled from "@emotion/styled"
import { PALLETS_LIGHT } from "../../../constants"
import DetailCard from "../../../components/MyPage/Series/DetailCard"
import { DETAIL_CARD_DATA } from "../../../data"
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import { useState } from "react";
import { DetailCardProps } from "../../../types/Main";
import React from "react";
import DraggableItem from "./DraggableItem";

interface SeriesContainerProps {
  handleEdit: () => void
}

const SeriesEditContainer = ({ handleEdit }: SeriesContainerProps) => {
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
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        background: isDragging ? "transparent" : "transparent",
        ...draggableStyle,
    });

    const onDragEnd = ({ destination, source }: DropResult): void => {
        // dropped outside the list
        if (!destination) return;
        const newItems = reorder(state, source.index, destination.index);
        setState(newItems);
    };
    return (
        <SeriesContainer>
            <SaveBtnContainer>
                <SaveBtn onClick={handleEdit}>저장</SaveBtn>
            </SaveBtnContainer>
            <DragDropContext onDragEnd={onDragEnd}>
                <CardContainer>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getItemStyle(
                                        snapshot.isDraggingOver
                                    )}
                                >
                                    {state.map((e, i) => (
                                        <DraggableItem key={`${e}_${i}`} getItemStyle={getItemStyle} e={e} i={i}/>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            );
                        }}
                    </Droppable>
                </CardContainer>
            </DragDropContext>
        </SeriesContainer>
    );
};

const SeriesContainer = styled.section``

const SaveBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const SaveBtn = styled.button`
  height: 32px;
  padding: 0 20px;
  border-radius: 4px;
  background: ${PALLETS_LIGHT.MAIN};
  color: ${PALLETS_LIGHT.BACKGROUND};
  &:hover {
    background: ${PALLETS_LIGHT.SUB};
    color: ${PALLETS_LIGHT.MAIN_FONT};
  }
`

const CardContainer = styled.article`
  margin-top: 36px;
  padding: 24px;
  background: ${PALLETS_LIGHT.BACKGROUND};
  border-radius: 4px;
`

export default SeriesEditContainer

