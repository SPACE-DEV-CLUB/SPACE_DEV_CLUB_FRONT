import type { NextPage } from "next";
import styled from "@emotion/styled";
import { SearchBar } from "../../components/Search/SearchBar";
import { FindPost } from "../../components/Search/FindPost";
import { MyCard } from "../../components/MyPage/MyCard";
import { CARD_DATA, MEDIA_QUERY_END_POINT } from "../../constants";


const MyPage: NextPage = () => {
    return (
        <Container>
            <SearchBar />
            <FindPost />
            {CARD_DATA.map((e, index) => <MyCard key={index} imageUrl="/public/image/sample.jpeg" postTitle={e.postTitle} postDesc={e.postDesc} tags={e.tags} date={e.date} comment={e.comment}/>)}
        </Container>
    )
}

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
` 