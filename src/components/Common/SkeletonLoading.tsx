import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

export default function SkeletonLoading() {
    const TOP:number[] = [235, 78, 195, 79, 167];
    const MID_TOP:number[] = [80, 120];
    const MID_BOTTOM:number[] = [64, 96, 80];
    const LAST:number[] = [
        68, 112, 45, 158, 136, 112, 90, 103, 51, 155, 77, 180, 103, 51, 115, 58,
        115, 86, 58, 202, 86, 135, 203, 101, 68, 101
    ];

    return (
        <>
            <TopCont>
                {TOP.map((item, index) => (
                    <li key={`${item}_${index}`} style={{ width: item }}></li>
                ))}
            </TopCont>
            <MidCont>
                <MidTopCont>
                    {MID_TOP.map((item, index) => (
                        <li
                            key={`${item}_${index}`}
                            style={{ width: item }}
                        ></li>
                    ))}
                </MidTopCont>
                <MidBottomCont>
                    {MID_BOTTOM.map((item, index) => (
                        <li
                            key={`${item}_${index}`}
                            style={{ width: item }}
                        ></li>
                    ))}
                </MidBottomCont>
            </MidCont>
            <BottomCont></BottomCont>
            <LastCont>
                <LastComp>
                    <ul>
                        {LAST.map((item, index) => (
                            <li
                                key={`${item}_${index}`}
                                style={{ width: item }}
                            ></li>
                        ))}
                    </ul>
                </LastComp>
                <LastComp>
                    <ul>
                        {LAST.map((item, index) => (
                            <li
                                key={`${item}_${index}`}
                                style={{ width: item }}
                            ></li>
                        ))}
                    </ul>
                </LastComp>
                <LastComp>
                    <ul>
                        {LAST.map((item, index) => (
                            <li
                                key={`${item}_${index}`}
                                style={{ width: item }}
                            ></li>
                        ))}
                    </ul>
                </LastComp>
            </LastCont>
        </>
    );
}

const fade = keyframes`
    0%{
        background: #f3f4f6;
    }
    50% {
        background: #f8f8f8;
    }
    100% {
        background: #f3f4f6;
    }
`;

const TopCont = styled.ul`
    display: flex;
    margin-bottom: 32px;
    li {
        width: 100%;
        border-radius: 5px;
        height: 60px;
        margin-right: 8px;
        animation: ${fade} 2s infinite;
    }
`;
const MidCont = styled.div`
    display: flex;
    flex-direction: column;
    li {
        height: 16px;
        border-radius: 5px;
        margin-right: 24px;
        animation: ${fade} 2s infinite;
    }
`;
const MidTopCont = styled.ul`
    display: flex;
    margin-bottom: 17px;
    li {
        height: 16px;
        border-radius: 3px;
        margin-right: 24px;
        animation: ${fade} 2s infinite;
    }
`;
const MidBottomCont = styled.ul`
    display: flex;
    margin-bottom: 39px;

    li {
        height: 32px;
        border-radius: 5px;
        margin-right: 8px;
        animation: ${fade} 2s infinite;
    }
`;
const BottomCont = styled.div`
    width: 100%;
    height: 401px;
    border-radius: 5px;
    animation: ${fade} 2s infinite;
    margin-bottom: 80px;
`;
const LastCont = styled.div``;
const LastComp = styled.div`
    display: flex;
    ul {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 50px;
    }
    li {
        height: 18px;
        border-radius: 5px;
        margin-right: 8px;
        margin-bottom: 12px;
        animation: ${fade} 2s infinite;
    }
`;
//F3F4F6
//F8F8F8
