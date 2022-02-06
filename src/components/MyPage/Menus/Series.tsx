import styled from "@emotion/styled"
import { MEDIA_QUERY_END_POINT } from "../../../constants"
import { CARD_DATA } from "../../../data"
import { SeriesCard } from "../Series/SeriesCard"
import BlankPage from "./BlankPage"

interface SeriesProps {
    username: string | string[] | undefined
}

export const Series = ({ username }: SeriesProps) => {
    return (
        <SeriesContainer>
            {CARD_DATA ? (
                CARD_DATA.map((e, i) => {
                    const { imageUrl, postTitle, date } = e
                    return (
                        <SeriesCard
                            key={i}
                            imageUrl={"/image/sample.jpeg"}
                            postTitle={postTitle}
                            count={3}
                            updateDate={date}
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
