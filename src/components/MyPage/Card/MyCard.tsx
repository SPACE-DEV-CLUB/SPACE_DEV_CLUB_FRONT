import styled from "@emotion/styled";
import Image from "next/image";
import SAMPLE_IMG from "../../../../public/image/sample.jpeg";

export const MyCard = () => {
    return (
        <MyCardContainer>
            <a href="/@id/dfjsfd">
                <div className="image-wrap">
                    <Image
                        layout="responsive"
                        alt="sample image"
                        src={SAMPLE_IMG}
                    />
                </div>
            </a>
            <a href="/@id/dfjsfd">
                <h2>lorem ipsum</h2>
            </a>
            <p>lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란? 혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?</p>
            <div className="tags-wrap">
                <a href="/tags/lorem">lorem</a>
            </div>
            <div>
                <span>1일 전</span>
                <span> · </span>
                <span>2개의 댓글</span>
            </div>
        </MyCardContainer>
    );
};

const MyCardContainer = styled.section`
    width: 100%;
    max-width: 768px;
    padding: 64px 0;
    border-top: 1px solid rgb(233, 236, 239);
    .image-wrap {
        background: pink;
        width: 100%;
        max-height: 402px;
        overflow: hidden;
    }
    h2 {
        font-size: 24px;
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
        background: #f1f3f5;
        border-radius: 15px;
        a {
            font-size: 16px;
            padding: 0 16px;
            color: #0ca678;
        }
    }
    span {
        color: #868296;
    }
`;
