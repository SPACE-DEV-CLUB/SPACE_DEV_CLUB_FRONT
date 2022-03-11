import styled from "@emotion/styled";
import { useContext } from "react";
import { ThemeContext } from "@pages/_app";
import { ThemeProps } from "@src/types/Theme";

export const LinkInputModal = () => {
  // const onSubmit = useCallback(
  //   (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     onConfirm(value);
  //   },
  //   [onConfirm, value]
  // );
  const { theme } = useContext(ThemeContext);

  return (
    <LinkModal theme={theme}>
      <Title>링크 등록</Title>
      <LinkForm action="">
        <LinkInput theme={theme} type="text" placeholder="URL 을 입력하세요" />
        <LinkSubmit theme={theme}>확인</LinkSubmit>
      </LinkForm>
    </LinkModal>
  );
};

const LinkModal = styled.div<ThemeProps>`
  box-sizing: border-box;
  margin-top: 16px;
  width: 320px;
  padding: 24px 16px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 4px;
  background-color: ${({ theme }) => theme.TOGGLE_BACKGROUND};
`;

const Title = styled.h5`
  margin-bottom: 16px;
`;

const LinkForm = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LinkInput = styled.input<ThemeProps>`
  width: 100%;
  outline: none;
  margin-right: 8px;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.MAIN_FONT};
  background-color: transparent;
  font-size: 16px;
  line-height: 1.5;
`;

const LinkSubmit = styled.button<ThemeProps>`
  outline: none;
  height: 24px;
  padding: 0 12px;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  word-break: keep-all;
  color: ${({ theme }) => theme.BACKGROUND};
  background-color: ${({ theme }) => theme.SUB_FONT};
  transition: all 0.125s ease-in 0s;

  &:hover {
    background-color: ${({ theme }) => theme.MAIN};
  }
`;
