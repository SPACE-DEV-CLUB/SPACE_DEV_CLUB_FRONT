import styled from "@emotion/styled";
import { PALLETS_LIGHT } from "../../../constants";
import DetailCard from "../../../components/MyPage/Series/DetailCard";
import { DETAIL_CARD_DATA } from "../../../data";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import { useState } from "react";
import { DetailCardProps } from "../../../types/Main";

interface SeriesContainerProps {
    handleEdit: () => void;
}
interface Test1 {
    id?: string;
    postIdx?: string;
    postTitle?: string;
    postDesc?: string;
    date?: string;
}
const SeriesEditContaienr = ({ handleEdit }: SeriesContainerProps) => {
    const getItems = (count: number) =>
        Array.from({ length: count }, (v, k) => k).map((k) => ({
            id: `Item ${k + 1}`,
            postIdx: DETAIL_CARD_DATA[k].postIdx, //e.postIdx
            postTitle: DETAIL_CARD_DATA[k].postTitle,
            postDesc: DETAIL_CARD_DATA[k].postDesc,
            date: DETAIL_CARD_DATA[k].date,
        }));
    const grid = 0;
    const [state, setState] = useState<DetailCardProps[]>(getItems(4));

    const reorder = (
        list: DetailCardProps[],
        startIndex: number,
        endIndex: number
    ): DetailCardProps[] => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const getItemStyle = (isDragging: boolean, draggableStyle?: any) => ({
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,
        background: isDragging ? "lightgreen" : "grey",
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
                                        <Draggable
                                            key={e.id}
                                            draggableId={String(e.id)}
                                            index={i}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps
                                                            .style
                                                    )}
                                                >
                                                    <DetailCard
                                                        key={i}
                                                        margin={"0 0 16px 0"}
                                                        padding={"16px"}
                                                        postIdx={i + 1} //e.postIdx
                                                        postTitle={e.postTitle}
                                                        postDesc={e.postDesc}
                                                        date={e.date}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
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

const SeriesContainer = styled.section``;

const SaveBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

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
`;

const CardContainer = styled.article`
    margin-top: 36px;
    padding: 24px;
    background: ${PALLETS_LIGHT.BACKGROUND};
    border-radius: 4px;
`;

export default SeriesEditContaienr;
