import styled from "@emotion/styled";
import React from "react";

function History() {
    return (
        <HistoryContainer>
            <h2>History</h2>
            <GraphWrap>
                <HistoryList>
                    <div className="wrapper">
                        <span>🎉</span>
                        <p>축 Space Dev Club 오픈!</p>
                    </div>
                    <div className="dot_line">⋮</div>
                    <div className="wrapper">
                        <span>💻</span>
                        <p>클론코딩 시작! 총 4개의 웹사이트 클론</p>
                    </div>
                    <div className="dot_line">⋮</div>
                    <div className="wrapper">
                        <span>🙌</span>
                        <p>민주, 현호 합류!</p>
                    </div>
                    <div className="dot_line">⋮</div>
                    <div className="wrapper">
                        <span>🏠</span>
                        <p>본격 블로그 프로젝트 시작~</p>
                    </div>
                    <div className="dot_line">⋮</div>
                </HistoryList>
            </GraphWrap>
        </HistoryContainer>
    );
}

export default History;

const HistoryContainer = styled.section`
    width: 100%;
    padding: 3rem 0;
    h2 {
        text-align: center;
        font-size: 3rem;
        margin: 3rem 0 5rem 0;
    }
`;

const GraphWrap = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HistoryList = styled.article`
    display: flex;
    flex-direction: column;
    .wrapper {
        display: flex;
        margin-top: 20px;
    }
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        text-align: center;
        vertical-align: center;
        font-size: 50px;
        margin-right: 30px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }
    p {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        vertical-align: center;
        color: #444;
        font-weight: 600;
        background: #fff;
        border-radius: 10px;
        padding: 10px;
        min-width: 500px;
        font-size: 24px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        line-height: 1.5;
    }
    .dot_line {
        font-size: 64px;
        text-align: center;
        margin-left: 5rem;
        margin: 1rem 0 0 5rem;
        color: #fff;
    }
`;
