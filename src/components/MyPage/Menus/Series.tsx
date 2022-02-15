import styled from "@emotion/styled"
import Cookies from "js-cookie"
import qs from "qs"
import { MEDIA_QUERY_END_POINT } from "../../../constants"
import { CARD_DATA } from "../../../data"
import { useData } from "../../../hooks/useData"
import { handleDate } from "../../../utils/date"
import Loading from "../../Common/Loading"
import { SeriesCard } from "../Series/SeriesCard"
import BlankPage from "./BlankPage"

interface SeriesProps {
  username: string | string[] | undefined
}

export const Series = ({ username }: SeriesProps) => {
  const query = qs.stringify(
    {
      populate: ["post", "userid"],
      filters: {
        userid: {
          userid: {
            $eq: username,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  const { data, isValidating } = useData("series-boxes", query)

  if (isValidating) return null
  console.log(data)
  return (
    <SeriesContainer>
      {data ? (
        data.data.map((e: any, i: number) => {
          const { title, updatedAt } = e.attributes
          return (
            <SeriesCard
              key={i}
              imageUrl={e.attributes.post.data[0].attributes.url}
              postTitle={title}
              count={e.attributes.post.data.length}
              updateDate={handleDate(updatedAt)}
              username={username}
            />
          )
        })
      ) : (
        <BlankPage dataname={"시리즈"} />
      )}
    </SeriesContainer>
  )
}

const SeriesContainer = styled.article`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    grid-template-columns: repeat(1, 1fr);
  }
`
