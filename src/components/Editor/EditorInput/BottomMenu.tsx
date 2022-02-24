import { useContext } from "react";
import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@components/Common/Button";
import { ThemeContext } from "@pages/_app";
import { ThemeProps } from "@src/types/Theme";

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
        fontWeight={500}
        ftColor={theme.SUB_FONT}
        bgColor={theme.TOGGLE_BACKGROUND}
        type="submit"
      >
        <ArrowBackIcon />
        <span>나가기</span>
      </Button>
      <ButtonRightWrap>
        <Button
          fontWeight={600}
          ftColor="#fff"
          bgColor={theme.BUTTON_SUB}
          type="submit"
        >
          임시저장
        </Button>
        <Button
          fontWeight={600}
          ftColor="#fff"
          bgColor={theme.BUTTON_MAIN}
          type="button"
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
