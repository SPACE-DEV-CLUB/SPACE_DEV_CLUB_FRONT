import React, { memo } from "react"
import { Draggable } from "react-beautiful-dnd"
import DetailCard from "./DetailCard"
import { DetailCardProps } from "../../../types/Main"

type DragItem = {
  e: DetailCardProps
  i: number
}

function DraggableItem({ e, i }: DragItem) {
  return (
    <Draggable key={e.id} draggableId={String(e.id)} index={i}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DetailCard
            key={i}
            margin={"0 0 16px 0"}
            padding={"16px"}
            opacity={snapshot.isDragging}
            postIdx={i + 1}
            postTitle={e.postTitle}
            postDesc={e.postDesc}
            date={e.date}
          />
        </div>
      )}
    </Draggable>
  )
}

export default memo(DraggableItem)
