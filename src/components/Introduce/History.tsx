import styled from "@emotion/styled";
import React from "react";

function History() {
    return (
        <HistoryContainer>
            <h2>History</h2>
            <GraphWrap>
                <HistoryList>
                    <div className="wrapper">
                        <span>๐</span>
                        <p>์ถ Space Dev Club ์คํ!</p>
                    </div>
                    <div className="dot_line">โฎ</div>
                    <div className="wrapper">
                        <span>๐ป</span>
                        <p>ํด๋ก ์ฝ๋ฉ ์์! ์ด 4๊ฐ์ ์น์ฌ์ดํธ ํด๋ก </p>
                    </div>
                    <div className="dot_line">โฎ</div>
                    <div className="wrapper">
                        <span>๐</span>
                        <p>๋ฏผ์ฃผ, ํํธ ํฉ๋ฅ!</p>
                    </div>
                    <div className="dot_line">โฎ</div>
                    <div className="wrapper">
                        <span>๐ </span>
                        <p>๋ณธ๊ฒฉ ๋ธ๋ก๊ทธ ํ๋ก์ ํธ ์์~</p>
                    </div>
                    <div className="dot_line">โฎ</div>
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
