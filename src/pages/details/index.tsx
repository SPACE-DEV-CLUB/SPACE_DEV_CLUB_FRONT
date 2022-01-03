import { NextPage } from "next";
import styled from "@emotion/styled";
import Image from "next/image";
import { DetailHeader } from "../../components/Details/DetailHeader";
import { LeftHeader } from "../../components/Details/LeftHeader";
import { RightHeader } from "../../components/Details/RightHeader";

const DetailsIndexPage: NextPage = () => {
  return (
    <DetailContainer>
      <LeftHeader />
      <DetailHeader />
      <RightHeader />
    </DetailContainer>
  );
};

export default DetailsIndexPage;

const DetailContainer = styled.section`
  display: flex;
`;
