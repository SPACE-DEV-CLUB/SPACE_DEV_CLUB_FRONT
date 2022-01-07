import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";

const OPTIONS = [
  { key: "notice", value: "notice", link: "/@sdv", name: "공지사항" },
  { key: "tag", value: "tag", link: "/tags", name: "태그 목록" },
  { key: "policy", value: "policy", link: "/policy", name: "서비스 정책" },
  { key: "slack", value: "slack", link: "/slack", name: "Slack" },
];

export const Notice = () => {
  const [visible, setVisible] = useState(false);
  const boxClickHandler = () => {
    setVisible(!visible);
  };

  return (
    <Container>
      <Button onClick={boxClickHandler}>⋮</Button>
      <Box visible={visible}>
        {OPTIONS.map((option) => {
          const { key, value, name, link } = option;
          return (
            <List key={key} value={value}>
              <Link href={link}>
                <a>{name}</a>
              </Link>
            </List>
          );
        })}
        <List>
          문의 <p>jhp@sdv.io</p>
        </List>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
`;

const Button = styled.div`
  color: rgb(134, 142, 150);
`;
const Box = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  background-color: white;
  top: 125%;
  right: 0;
  margin-top: 8px;
  width: 192px;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;
  padding: 0;
  z-index: 10;
`;

const List = styled.li`
  list-style: none;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 16px;
  cursor: pointer;
  line-height: none;
  & + & {
    border-top: 1px solid rgb(241, 243, 245);
  }
  &:last-child {
    font-size: 12px;
  }
  p {
    font-weight: 400;
    font-size: 12px;
  }
`;
