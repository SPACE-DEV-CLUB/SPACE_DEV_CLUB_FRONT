import styled from "@emotion/styled";
import { useState } from "react";
import { PALLETS_LIGHT } from "../../constants";

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
  position: -webkit-sticky;
  position: sticky;
  top: 210px;
  right: 260px;
  height: 100%;

  padding: 20px 0 0 50px;
  article {
    padding: 8px 10px;
    border-left: 2px solid ${PALLETS_LIGHT.SUB};
  }
  div {
    font-size: 14px;
    color: ${PALLETS_LIGHT.SUB};
  }
  div:not(:last-child) {
    margin-bottom: 5px;
  }
  div.h4 {
    margin-left: 12px;
  }
`;
