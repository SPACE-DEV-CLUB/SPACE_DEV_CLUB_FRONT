import styled from "@emotion/styled";
import { useContext, useState } from "react";
import { PALLETS_LIGHT } from "@constants/index";
import Link from "next/link";
import { PostContext } from "@src/pages/[id]/[details]";

interface StrNum {
  strNum: number;
}

export const RightHeader = () => {
  const { postObj } = useContext(PostContext);
  const [listData, setListData] = useState(postObj.contents.match(/#+ .*/g)!);
  // const Scrollref = useRef<HTMLDivElement>(null);

  // const onClickList = () => {
  //   Scrollref.current?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <Container>
      <h2 className="sr-only">목차</h2>
      {listData.length !== 0 && (
        <article>
          {listData.map((str, i) => {
            const strNum = str.match(/#*/)?.join("").length!;
            const strReg = str.match(/[^#+][#]*/g)?.join("");

            return (
              <Link key={`Detail-List-${i}`} href="#">
                <a>
                  <List strNum={strNum}>{strReg}</List>
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
const List = styled.div<StrNum>`
  font-size: 14px;
  color: ${PALLETS_LIGHT.ICON};
  margin-bottom: 5px;
  margin-left: ${({ strNum }) => strNum * 10}px;
  &:hover {
    color: ${PALLETS_LIGHT.SUB_FONT};
  }
`;
