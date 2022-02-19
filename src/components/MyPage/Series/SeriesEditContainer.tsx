import styled from "@emotion/styled"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { PostProps } from "@src/types/Main"
import React from "react"
import DraggableItem from "./DraggableItem"
import { useContext } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"
import axios from "axios"
import { API_ENDPOINT } from "@constants/index"

interface SeriesContainerProps {
  handleEdit: () => void
  post: PostProps[]
  setPost: (post: PostProps[]) => void
}

const SeriesEditContainer = ({
  handleEdit,
  post,
  setPost,
}: SeriesContainerProps) => {
  const { theme } = useContext(ThemeContext)

  const reorder = (
    list: PostProps[],
    startIndex: number,
    endIndex: number,
  ): PostProps[] => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    result.forEach(async (e: PostProps, i: number) => {
      await axios
        .put(`${API_ENDPOINT}/posts/${e.id}`, {
          data: {
            postidx: i + 1,
          },
        })
        .then((res) => {
          e.attributes.postidx = i + 1
        })
    })
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
    const newItems = reorder(post, source.index, destination.index)
    setPost(newItems)
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
                {post.map((e, i) => (
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
    color: ${({ theme }) => theme.BACKGROUND};
  }
`

const CardContainer = styled(Droppable)<ThemeProps>`
  margin-top: 36px;
  padding: 24px;
  background: ${({ theme }) => theme.BACKGROUND};
  border-radius: 4px;
`

export default SeriesEditContainer
