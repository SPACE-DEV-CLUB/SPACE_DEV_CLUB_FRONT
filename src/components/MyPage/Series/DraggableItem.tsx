import React, { memo } from "react"
import { Draggable } from "react-beautiful-dnd"
import DetailCard from "./DetailCard"
import { PostProps } from "@src/types/Main"
import { handleDate } from "@utils/date"

type DragItem = {
  e: PostProps
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
            postTitle={e.attributes.title}
            postDesc={e.attributes.description}
            date={handleDate(e.attributes.createdAt)}
          />
        </div>
      )}
    </Draggable>
  )
}

export default memo(DraggableItem)
