import styled from "@emotion/styled"
import React, { ReactChild, useContext } from "react"
import { ThemeContext } from "@pages/_app"
import { ThemeProps } from "@src/types/Theme"

type ModalProps = {
  title: string
  handleOK: () => void
  handleCancel: () => void
  children: ReactChild
  check: boolean
}
export const Modal = ({
  title,
  handleOK,
  handleCancel,
  children,
}: ModalProps) => {
  const { theme } = useContext(ThemeContext)
  document.body.style.overflow = "hidden"
  return (
    <Container theme={theme}>
      <ContContainer theme={theme}>
        <ModalTop theme={theme}>
          <h2>{title}</h2>
          <p>{children}</p>
        </ModalTop>
        <ModalBottom theme={theme}>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            취소
          </button>
          <button type="button" className="btn-approve" onClick={handleOK}>
            확인
          </button>
        </ModalBottom>
      </ContContainer>
    </Container>
  )
}

const Container = styled.section<ThemeProps>`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.ModelRGBA};
  z-index: 999;
  top: 0;
  left: 0;
`

const ContContainer = styled.section<ThemeProps>`
  position: absolute;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 352px;
  height: 140px;
  padding: 32px 24px;
  background: ${({ theme }) => theme.BACKGROUND};
  box-shadow: ${({ theme }) => theme.TOGGLE_BACKGROUND} 0px 0px 5px 1px;
  border-radius: 4px;
`

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
`

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
    color: ${({ theme }) => theme.MAIN_FONT};
  }
  .btn-approve {
    background: ${({ theme }) => theme.MAIN};
    color: ${({ theme }) => theme.BACKGROUND};
    margin-left: 12px;
  }
`
