import Link from "next/link";
import React from "react";
import styled from "@emotion/styled";
import { Notice, SelectBox } from "./index";
import { MEDIA_QUERY_END_POINT } from "../../constants";
import MovingIcon from "@mui/icons-material/Moving";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const Filter = ({ route }: { route: string }) => {
  return (
    <FilterContainer>
      <BoxContainer>
        <BoxContainer>
          <Link href="/" passHref>
            <FilterName route={route}>
              <TrendIcon />
              트렌딩
            </FilterName>
          </Link>
          <Link href="/recent" passHref>
            <FilterName route={route}>
              <ClockIcon />
              최신
            </FilterName>
          </Link>
          <Line route={route}></Line>
        </BoxContainer>
        <SelectBox route={route}></SelectBox>
      </BoxContainer>
      <Notice></Notice>
    </FilterContainer>
  );
};

const TrendIcon = styled(MovingIcon)`
  @media (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    font-size: 20px;
  }
`;
const ClockIcon = styled(AccessTimeIcon)`
  @media (max-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    font-size: 20px;
  }
`;
const FilterName = styled.a<{ route: string }>`
  font-weight: bold;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-decoration: none;
  color: ${(props) =>
    props.route === "home" ? "black" : "rgb(134, 142, 150)"};
  height: 48px;
  & + & {
    color: ${(props) =>
      props.route === "home" ? "rgb(134, 142, 150)" : "black"};
  }
  @media (min-width: 1024px) {
    font-size: 18px;
    width: 112px;
  }
`;

const Line = styled.div<{ route: string }>`
  width: 50%;
  left: ${(props) => (props.route === "home" ? "0%" : "50%")};
  height: 2px;
  position: absolute;
  bottom: 0px;
  background: rgb(52, 58, 64);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
  align-items: center;
  margin: 0 auto;

  @media (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    max-width: ${MEDIA_QUERY_END_POINT.TABLET};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.LARGE}) {
    max-width: ${MEDIA_QUERY_END_POINT.LARGE};
  }
  @media (min-width: ${MEDIA_QUERY_END_POINT.XLARGE}) {
    max-width: 1728px;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;
