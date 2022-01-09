import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import SAMPLE_IMAGE from "../../../../public/image/sample.jpeg";
import { MEDIA_QUERY_END_POINT } from "../../../constants";

export default function DetailCard() {
    return (
        <>

        {/* 마이페이지 글 카드, 서치카드 공유, 시리즈 카드 하나, 시리즈 디테일 하나. */}
            <Container>
                <h2>
                    <span>1. </span>벨로그 홈에 그리드 뷰 되살리기 1편: 문제
                    확인과 벤치마킹
                </h2>
                <DetailContainer>
                    <div className="image-container">
                        <Image className="main-image" alt="sample image" layout="responsive" src={SAMPLE_IMAGE}></Image>
                    </div>
                    <div className="detail-desc">
                        <p className="desc">
                            이번에 벨로그 홈에 그리드 뷰를 되살릴 계획인데요, 이
                            과정을 포스트로 남기면 재밌을 것 같아서 이렇게
                            시리즈를 시작합니다! 이번 포스트를 통해 제가 어떤
                            생각을 하 이번에 벨로그 홈에 그리드 뷰를 되살릴
                            계획인데요, 이 과정을 포스트로 남기면 재밌을 것
                            같아서 이렇게 시리즈를 시작합니다! 이번 포스트를
                            통해 제가 어떤 생각을 하
                        </p>
                        <p className="date">2020년 2월 21일</p>
                    </div>
                </DetailContainer>
            </Container>
        </>
    );
}

const Container = styled.div`
    span {
        color: #999;
        font-style: italic;
    }
    h2 {
        margin-bottom: 20px;
        font-size: 21px;
        color: #495057;
    }
`;

const DetailContainer = styled.div`
    display: flex;
    .image-container {
        width: 192px;
        height: 100px;
        overflow: hidden;
    }
    .detail-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 16px;
        width: 80%;
        > .desc {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 24px;
            color: #495057;
        }
        > .date {
            color: #adb5bd;
            font-size: 14px;
        }
    }
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        display: block;
        .image-container {
            width: 100%;
            height: auto;
            max-height: 377px;
        }
        .detail-desc {
            width: 100%;
            margin: 0;
            >.date {
                margin-top: 16px;
            }
        }
        .main-image {
            object-fit: cover;
        }
    }
`;
