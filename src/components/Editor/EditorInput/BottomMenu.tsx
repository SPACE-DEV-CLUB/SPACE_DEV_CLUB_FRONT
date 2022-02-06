import styled from "@emotion/styled";
import { PALLETS_LIGHT } from "../../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "../../Common/Button";
import { useContext } from "react";
import { ThemeContext } from "../../../pages/_app";
import { ThemeProps } from "../../../types/Theme";

interface ButtonProps {
  bgColor: string;
  ftColor: string;
  hoverColor: string;
  fontWeight: number;
}

export const BottomMenu = ({ handleSubmitModal }: any) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrap theme={theme}>
      <Button
        hoverColor={PALLETS_LIGHT.BACKGROUND}
        fontWeight={500}
        ftColor={PALLETS_LIGHT.SUB_FONT}
        bgColor="#fff"
        type="submit"
      >
        <ArrowBackIcon />
        <span>나가기</span>
      </Button>
      <ButtonRightWrap>
        <Button
          hoverColor="#f0f0fa"
          fontWeight={600}
          ftColor={PALLETS_LIGHT.SUB_FONT}
          bgColor={PALLETS_LIGHT.SUB}
          type="submit"
        >
          임시저장
        </Button>
        <Button
          hoverColor="#9090de"
          fontWeight={600}
          ftColor={PALLETS_LIGHT.SUB}
          bgColor={PALLETS_LIGHT.MAIN}
          type="submit"
          handleBtn={handleSubmitModal}
        >
          출간하기
        </Button>
      </ButtonRightWrap>
    </Wrap>
  );
};

const Wrap = styled.div<ThemeProps>`
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
  background: ${({ theme }) => theme.BACKGROUND};
`;

const ButtonRightWrap = styled.div`
  display: flex;
`;
