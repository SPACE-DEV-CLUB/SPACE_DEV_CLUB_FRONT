import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import SAMPLE_IMG from "../../../public/image/sample.jpeg";
import { MEDIA_QUERY_END_POINT, PALLETS_LIGHT } from "../../constants";
import { Profile } from "./Profile";

type PropsTypes = {
    imageUrl: string;
    postTitle: string;
    postDesc: string;
    tags: Array<string>;
    date: number;
    comment: number;
    username: string | string[] | undefined;
    mySearch?: boolean;
    count?: number;
    day?: number;
};
export const MyCard = ({
    imageUrl,
    postTitle,
    postDesc,
    tags,
    date,
    comment,
    mySearch,
    username,
    count,
    day,
}: PropsTypes) => {
    return (
        <MyCardContainer>
            {!mySearch ? (
                <>
                    <Profile id={username} />
                    <Link href={`/${username}`} passHref>
                        <a>
                            <ImageContainer>
                                <Image
                                    layout="responsive"
                                    width={734}
                                    height={402}
                                    alt="sample image"
                                    src={imageUrl}
                                />
                            </ImageContainer>

                            <h2>{postTitle}</h2>
                        </a>
                    </Link>
                    <p>{postDesc}</p>
                    {tags.map((e, index) => (
                        <TagsContainer key={index}>
                            <Link href={""}>
                                <a>{e}</a>
                            </Link>
                        </TagsContainer>
                    ))}
                    <DateCommentContainer>
                        <span>{date}일 전</span>
                        <span> · </span>
                        <span>{comment}개의 댓글</span>
                    </DateCommentContainer>
                </>
            ) : (
                <>
                    <Link href={`/${username}`} passHref>
                        <a>
                            <ImageContainer>
                                <Image
                                    layout="responsive"
                                    width={734}
                                    height={402}
                                    alt="sample image"
                                    src={imageUrl}
                                />
                            </ImageContainer>
                            <h2>{postTitle}</h2>
                        </a>
                    </Link>
                    <p>{postDesc}</p>
                    <DateCommentContainer>
                        <span>{date}일 전</span>
                        <span> · </span>
                        <span>{comment}개의 댓글</span>
                    </DateCommentContainer>
                </>
            )}
        </MyCardContainer>
    );
};

const MyCardContainer = styled.section`
    width: 100%;
    max-width: 768px;
    padding-bottom: 64px;
    & + & {
        padding: 64px 0;
    }
    border-bottom: 1px solid ${PALLETS_LIGHT.BACKGROUND};
    h2 {
        font-size: 24px;
        margin-top: 20px;
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
    /* .series-title {
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
        .date-comment-wrap {
            font-size: 12px;
        }
    }
`;

const DateCommentContainer = styled.div`
    color: ${PALLETS_LIGHT.SUB_FONT};
    font-size: 14px;
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        font-size: 12px;
    }
`;

const ImageContainer = styled.div`
    background: pink;
    overflow: hidden;
`;

const TagsContainer = styled.div`
    display: inline-block;
    margin: 0 14px 14px 0;
    padding: 5px 0;
    background: #f1f3f5;
    border-radius: 15px;
    a {
        font-size: 16px;
        padding: 0 16px;
        color: ${PALLETS_LIGHT.MAIN};
    }
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        a {
            font-size: 12px;
        }
    }
`;
