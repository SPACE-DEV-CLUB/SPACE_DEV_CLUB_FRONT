import styled from "@emotion/styled";
import { ErrorPage } from "@src/components/Common/ErrorPage";
import { EditorContainer } from "@src/components/Editor/EditorContainer";
import { useData } from "@src/hooks/useData";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const EditorUpdate: NextPage = () => {
  const userCookieData = Cookies.get("user");
  const loginUserName =
    userCookieData && JSON.parse(userCookieData!).attributes.userid;
  const router = useRouter();

  const { data: PublishedData, error: PublishedDataError } = useData(
    "posts",
    `populate=*&filters[userid][userid]=${loginUserName}&filters[url]=${router.query.update}`
  );

  const { data: UnPublishedData, error: UnPublishedDataError } = useData(
    "posts",
    `populate=*&publicationState=preview&filters[publishedAt][$null]=true&filters[userid][userid]=${loginUserName}&filters[url]=${router.query.update}`
  );

  if (!PublishedData || !UnPublishedData) return <div>Loding</div>;
  if (!userCookieData || PublishedDataError || UnPublishedDataError)
    return <ErrorPage />;
  if (PublishedData.data.length === 0 && UnPublishedData.data.length === 0)
    return <ErrorPage />;
  const DetailData =
    PublishedData.data.length === 0
      ? UnPublishedData.data[0]
      : PublishedData.data[0];

  return (
    <Container>
      <h1 className="sr-only">EditorUpdate</h1>
      <EditorContainer DetailData={DetailData} />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export default EditorUpdate;
