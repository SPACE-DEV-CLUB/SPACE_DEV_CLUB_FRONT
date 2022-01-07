import styled from "@emotion/styled";
import Image from "next/image";
import SAMPLE_IMG from "../../../public/image/sample.jpeg";
import { MEDIA_QUERY_END_POINT } from "../../constants";
import { Profile } from "./Profile";

interface cardType {
    imageUrl: string;
    postTitle: string;
    postDesc: string;
    tags: Array<string>;
    date: number;
    comment: number;
}

export const MyCard = ({
    imageUrl,
    postTitle,
    postDesc,
    tags,
    date,
    comment,
}: {
    imageUrl: string;
    postTitle: string;
    postDesc: string;
    tags: Array<string>;
    date: number;
    comment: number;
}) => {
    return (
        <MyCardContainer>
            <Profile id={"jae04099"} />
            <a href="/@id/dfjsfd">
                <div className="image-wrap">
                    <Image
                        layout="responsive"
                        width={100}
                        height={100}
                        alt="sample image"
                        src={imageUrl}
                    />
                </div>
            </a>
            <a href="/@id/dfjsfd">
                <h2>{postTitle}</h2>
            </a>
            <p>{postDesc}</p>
            {tags.map((e, index) => (
                <div key={index} className="tags-wrap">
                    <a href="/tags/lorem">{e}</a>
                </div>
            ))}
            <div className="comment">
                <span>{date}일 전</span>
                <span> · </span>
                <span>{comment}개의 댓글</span>
            </div>
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
    border-bottom: 1px solid rgb(233, 236, 239);
    .image-wrap {
        background: pink;
        width: 100%;
        max-height: 402px;
        overflow: hidden;
    }
    h2 {
        font-size: 24px;
        margin-top: 20px;
    }
    p {
        color: #495057;
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
    .tags-wrap {
        display: inline-block;
        margin: 0 14px 14px 0;
        padding: 5px 0;
        background: #f1f3f5;
        border-radius: 15px;
        a {
            font-size: 16px;
            padding: 0 16px;
            color: #0ca678;
        }
    }
    .comment > span {
        color: #868296;
    }
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        padding: 32px 0;
        h2 {
            font-size: 16px;
        }
        p {
            font-size: 14px;
        }
        .tags-wrap {
            a {
                font-size: 12px;
            }
        }
        .comment > span {
            color: #868296;
            font-size: 12px;
        }
    }
`;
