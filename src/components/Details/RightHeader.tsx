import styled from "@emotion/styled";
import { useState } from "react";

export const RightHeader = () => {
  const [listData, setListData] = useState(["프로젝트 설계 시작", "역할"]);
  return (
    <Container>
      <h2 className="sr-only">목차</h2>
      {listData.length === 0 ? (
        <div></div>
      ) : (
        <article>
          {listData.map((str) => {
            return <div key={`Detail-List-${str}`}>{str}</div>;
          })}
        </article>
      )}
    </Container>
  );
};

const Container = styled.section`
  flex: 1;
  padding: 20px 0 0 50px;
  article {
    padding: 8px 10px;
    border-left: 2px solid rgb(233, 236, 239);
  }
  div {
    font-size: 14px;
    color: #868e96;
  }
  div:not(:last-child) {
    margin-bottom: 5px;
  }
  div.h4 {
    margin-left: 12px;
  }
`;
