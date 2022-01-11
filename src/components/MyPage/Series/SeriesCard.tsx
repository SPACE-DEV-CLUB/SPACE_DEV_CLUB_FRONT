import styled from "@emotion/styled";
import Image from "next/image";
import { MEDIA_QUERY_END_POINT, PALLETS_LIGHT } from "../../../constants";

export const SeriesCard = ({
    imageUrl,
    postTitle,
    count,
    updateDate
}: {
    imageUrl: string;
    postTitle: string;
    count?: number;
    updateDate: number;
}) => {
    return (
        <Container>
            <a href="/@id/dfjsfd">
                <ImageContainer>
                    <Image
                        layout="responsive"
                        width={734}
                        height={402}
                        alt="sample image"
                        src={imageUrl}
                    />
                </ImageContainer>
            </a>
            <a href="/@id/dfjsfd">
                <h2>{postTitle}</h2>
            </a>
            <DateCommentContainer>
                <span>{count}개의 포스트</span>
                <span> · </span>
                <span>마지막 업데이트 {updateDate}</span>
            </DateCommentContainer>
        </Container>
    );
};

const Container = styled.section`
    width: 100%;
    max-width: 768px;
    padding-bottom: 64px;
    & + & {
        padding: 64px 0;
    }
    border-bottom: 1px solid ${PALLETS_LIGHT.BACKGROUND};
    h2 {
        font-size: 24px;
        margin: 20px 0;
    }
    p {
        color: ${PALLETS_LIGHT.SUB_FONT};
        font-size: 16px;
        line-height: 25px;
        margin: 8px 0 32px 0;
        /* 3줄 말줄임 */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 3;
        height: 70px;
    }
    /*.tags-wrap {
        display: inline-block;
        margin: 0 14px 14px 0;
        padding: 5px 0;
        background: ${PALLETS_LIGHT.BACKGROUND};
        border-radius: 15px;
        a {
            font-size: 16px;
            padding: 0 16px;
            color: ${PALLETS_LIGHT.MAIN};
        }
    }

    .series-title {
        margin-bottom: 13px;
        font-size: 16px;
    }
    .series-info-wrap {
        color: #868e96;
        font-size: 14px;
    }
    .series-count {
        color: #495057;
    } */
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        padding: 32px 0;
        h2 {
            font-size: 16px;
        }
        p {
            font-size: 14px;
        }
        /* .tags-wrap {
            a {
                font-size: 12px;
            }
        } */
    }
`;

const ImageContainer = styled.div`
        background: pink;
        overflow: hidden;
`

const DateCommentContainer = styled.div`
        color: ${PALLETS_LIGHT.SUB_FONT};
        font-size: 14px;
        @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
            font-size: 12px;  
    }
`