import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { Header } from "../Common/Header";
import History from "./History";
import IntroFooter from "./IntroFooter";
import Members from "./Members";

function Intro() {
    return (
        <Container>
            <Header username="" user />
            <HeaderContainer>
                <h1>
                    Hi! We Are <br />
                    🚀 Space Dev Club 🚀
                </h1>
            </HeaderContainer>
            <History />
            <Members />
            <IntroFooter />
        </Container>
    );
}

export default Intro;

const Container = styled.div``;
const gradient = keyframes`
    0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;
const HeaderContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 700px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: ${gradient} 15s ease infinite;
    font-size: 5rem;
    text-align: center;
    color: beige;
`;
