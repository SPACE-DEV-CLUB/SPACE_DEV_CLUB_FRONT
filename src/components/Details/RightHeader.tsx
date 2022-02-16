import styled from "@emotion/styled";
import { useState } from "react";
import { PALLETS_LIGHT } from "@constants/index";
import Link from "next/link";

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
            return (
              <Link key={`Detail-List-${str}`} href="#">
                <a>
                  <List>{str}</List>
                </a>
              </Link>
            );
          })}
        </article>
      )}
    </Container>
  );
};

const Container = styled.section`
  position: -webkit-sticky;
  position: sticky;
  top: 290px;
  height: 100%;

  article {
    /* width: 130px; */
    padding: 8px 10px;
    border-left: 2px solid ${PALLETS_LIGHT.SUB};
    margin-left: 40px;
  }
  div.h4 {
    margin-left: 12px;
  }
  @media screen and (max-width: 1365px) {
    display: none;
  }
`;
const List = styled.div`
  font-size: 14px;
  color: ${PALLETS_LIGHT.ICON};
  margin-bottom: 5px;
  &:hover {
    color: ${PALLETS_LIGHT.SUB_FONT};
  }
`;
