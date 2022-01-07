import styled from "@emotion/styled";
import { NextPage } from "next";
import { useState } from "react";

const OPTIONS = [
  { key: "today", value: "today", name: "오늘" },
  { key: "week", value: "week", name: "이번 주" },
  { key: "month", value: "month", name: "이번 달" },
  { key: "year", value: "year", name: "올 해" },
];

export const SelectBox = ({ route }: { route: string }) => {
  const [visible, setVisible] = useState(false);
  const [filterText, setFilterText] = useState("이번 주");
  const [textColor, setTextColor] = useState(filterText);
  const boxClickHandler = () => {
    setVisible(!visible);
  };
  const optionClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const text = (e.target as HTMLElement).textContent as string;
    setFilterText(text);
    setVisible(!visible);
    setTextColor(text);
    console.log(e.target);
  };
  return (
    <Container>
      <Button route={route} onClick={boxClickHandler}>
        {filterText}
      </Button>
      <Box visible={visible}>
        {OPTIONS.map((option) => {
          const { key, name } = option;
          return (
            <List
              onClick={optionClickHandler}
              key={key}
              value={name}
              color={textColor}
            >
              {name}
            </List>
          );
        })}
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Button = styled.div<{ route: string }>`
  background: white;
  height: 32px;
  width: 96px;
  border-radius: 4px;
  display: ${(props) => (props.route === "home" ? "flex" : "none")};
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  font-weight: 600;
  color: rgb(73, 80, 87);
  font-size: 14px;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
  cursor: pointer;
  &::after {
    display: block;
    content: "";
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black;
  }
  &:hover {
    color: rgb(18, 184, 134);
    &::after {
      border-top: 5px solid rgb(18, 184, 134);
    }
  }
`;
const Box = styled.ul<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  top: 130%;
  right: 0;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;
  background: white;
  padding: 0;
  width: 192px;
  z-index: 10;
`;

const List = styled.li`
  list-style: none;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 16px;
  cursor: pointer;
  box-sizing: border-box;
  &.active {
    color: rgb(18, 184, 134);
  }
  &:hover {
    background-color: #f8f9fa;
  }
  & {
    border-top: 1px solid rgb(241, 243, 245);
  }
  color: ${(props) =>
    props.color === props.value ? "rgb(18, 184, 134)" : "black"};
`;
