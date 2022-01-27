import styled from "@emotion/styled";
import React, { useContext } from "react";
import { ThemeContext } from "../../pages/_app";
import { ThemeProps } from "../../types/Theme";

type ModalProps = {
    title?: string;
    cont?: string;
};
export default function Modal({ title, cont }: ModalProps) {
    const { theme } = useContext(ThemeContext);
    return (
        <Container>
            <ContContainer>
                <ModalTop theme={theme}>
                    <h2>시리즈 삭제</h2>
                    <p>
                        시리즈를 정말 삭제하시겠습니까?
                        <br />
                        시리즈 안에 들어있는 포스트들은 삭제되지 않습니다.
                    </p>
                </ModalTop>
                <ModalBottom theme={theme}>
                    <button className="btn-cancel">취소</button>
                    <button className="btn-approve">확인</button>
                </ModalBottom>
            </ContContainer>
        </Container>
    );
}

const Container = styled.section`
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.8);
    z-index: 999;
    top: 0;
    left: 0;
`;

const ContContainer = styled.section`
    position: absolute;
    margin: 0 auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 352px;
    height: 140px;
    padding: 32px 24px;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 4px;
`;

const ModalTop = styled.div<ThemeProps>`
    text-align: left;
    h2 {
        font-size: 24px;
    }
    p {
        margin: 16px 0;
        line-height: 1.5;
        color: ${({ theme }) => theme.ICON};
    }
`;

const ModalBottom = styled.div<ThemeProps>`
    display: flex;
    align-items: flex-end;
    justify-content: right;
    margin-top: 32px;
    button {
        padding: 7px 20px;
        border-radius: 4px;
        font-size: 16px;
        &:hover {
            opacity: 0.7;
        }
    }
    .btn-cancel {
        background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
    }
    .btn-approve {
        background: ${({ theme }) => theme.MAIN};
        color: ${({ theme }) => theme.BACKGROUND};
        margin-left: 12px;
    }
`;
