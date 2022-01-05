import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { PALLETS } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ButtonProps {
  bgColor: string;
  ftColor: string;
  hoverColor: string;
  fontWeight: number;
}

export const BottomMenu = () => {
  return (
    <Wrap>
      <EditorButton
        hoverColor={PALLETS.SUB}
        fontWeight={500}
        ftColor={PALLETS.FONT}
        bgColor="#fff"
      >
        <ArrowBackIcon />
        나가기
      </EditorButton>
      <ButtonRightWrap>
        <EditorButton
          hoverColor="#f0f0fa"
          fontWeight={600}
          ftColor={PALLETS.FONT}
          bgColor={PALLETS.SUB}
        >
          임시저장
        </EditorButton>
        <EditorButton
          hoverColor="#9090de"
          fontWeight={600}
          ftColor="#fff"
          bgColor={PALLETS.MAIN}
        >
          출간하기
        </EditorButton>
      </ButtonRightWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
`;

const dynamicStyle = (props: ButtonProps) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 18px;
  font-weight: ${props.fontWeight};
  line-height: 1.8;
  color: ${props.ftColor};
  background-color: ${props.bgColor};
  cursor: pointer;

  &:hover {
    background-color: ${props.hoverColor};
  }
`;

const EditorButton = styled.button`
  ${dynamicStyle}

  &:last-child {
    margin-left: 12px;
  }
`;

const ButtonRightWrap = styled.div`
  display: flex;
`;
