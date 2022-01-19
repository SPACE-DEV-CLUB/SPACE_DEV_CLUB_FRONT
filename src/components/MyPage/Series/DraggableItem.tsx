import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import DetailCard from "./DetailCard";
import {DetailCardProps} from '../../../types/Main'

type DragItem = {
    getItemStyle: any,
    e: DetailCardProps,
    i: number
}

function DraggableItem({getItemStyle, e, i} : DragItem) {
    return (
        <div>
            <Draggable key={e.id} draggableId={String(e.id)} index={i}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                    >
                        <DetailCard
                            key={i}
                            margin={"0 0 16px 0"}
                            padding={"16px"}
                            postIdx={i + 1}
                            postTitle={e.postTitle}
                            postDesc={e.postDesc}
                            date={e.date}
                        />
                    </div>
                )}
            </Draggable>
        </div>
    );
}

export default memo(DraggableItem);
