import styled from "@emotion/styled"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import TagCardLoading from "./TagCardLoading"

const TagMainLoading = () => {
  return (
    <TagsContainer>
      {new Array(16).fill(1).map((e) => (
        <TagCardLoading key={e} />
      ))}
    </TagsContainer>
  )
}

export default TagMainLoading

const TagsContainer = styled.article`
  width: 100%;
  display: grid;
  margin: 64px auto 0;
  gap: 10px;
  grid-template-columns: repeat(1, 1fr);
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.SMALL}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
    width: 1024px;
  }

  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.DESKTOP}) {
    grid-template-columns: repeat(4, 1fr);
    width: 1200px;
  }
`
