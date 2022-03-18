import styled from "@emotion/styled"
import CardLoading from "../Common/CardLoading"
import TagLoading from "../Tags/TagLoading"

export const MypageLoading = () => {
  return (
    <MypageLoadingContainer>
      <TagLoading />
      <CardLoading />
    </MypageLoadingContainer>
  )
}

const MypageLoadingContainer = styled.div`
  & > div {
    margin: 200px auto;
  }
`
