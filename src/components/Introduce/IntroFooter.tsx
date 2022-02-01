import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";
import sdvLogo from "../../../public/image/logo-short-w.png";

function IntroFooter() {
    return (
        <Container>
            <ContContainer>
                <LogoWrap>
                    <Image alt="logo" width={140} height={65} src={sdvLogo} />
                </LogoWrap>
            </ContContainer>
            <CopyContainer>
                <p>
                    Copyrightⓒ2022 Space Dev Club
                    <br />
                    All rights reserved.
                </p>
            </CopyContainer>
        </Container>
    );
}

export default IntroFooter;

const Container = styled.footer`
    background: #000;
    padding: 3rem;
`;
const ContContainer = styled.section`
    /* background: blue; */
    padding-bottom: 3rem;
    border-bottom: 1px solid #cfcfcf;
`;
const LogoWrap = styled.div``;

const CopyContainer = styled.section`
    padding-top: 3rem;
    p {
        color: #f2f2f2;
        font-size: 12px;
        line-height: 1.5;
    }
`;
