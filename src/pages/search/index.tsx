import type { NextPage } from "next";
import styled from "@emotion/styled";
import { API_ENDPOINT, MEDIA_QUERY_END_POINT } from "../../constants";
import { Header } from "../../components/Common/Header";
import SearchHead from "../../components/Search/SearchHead";
import SearchFilter from "../../components/Search/SearchFilter";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

const MyPage: NextPage = () => {

    return (
        <>
            <SearchHead />
            <Header username={"deli-ght"} user={false} />
            <Container>
                <SearchFilter />
            </Container>
        </>
    );
};

export default MyPage;

const Container = styled.div`
    margin: 0 auto;
    max-width: 734px;
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        padding: 20px;
        input {
            height: 27px;
        }
    }
`;
