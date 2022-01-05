import type { NextPage } from "next";
import styled from "@emotion/styled";
import { SearchBar } from "../../components/Search/SearchBar";
import { FindPost } from "../../components/Search/FindPost";
import { MyCard } from "../../components/MyPage/MyCard";
import { MEDIA_QUERY_END_POINT } from "../../constants";
import SAMPLE_IMG from "../../../public/image/sample.jpeg";

const cardData = [
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
    {
        imageUrl: 'http://localhost:3010/',
        postTitle: 'lorem ipsum',
        postDesc: 'lorem ipsum lorem ipsum 혹시 그럼 이런 글도 혹시 쓰실 생각있으실까요? 제 질문이지만 아마 다른 분들도 궁금해할 질문같아서요ㅎㅎ 1. 프론트엔드 포지션이 생긴 이유, 앞으로 어떻게 될지 2.프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?혹시 그럼 이런 글도 혹시 쓰실 생각 있으실까요? 제 질문이지만아마 다른 분들도 궁금해할 질문같아서요 ㅎㅎ 1. 프론트엔드포지션이 생긴 이유, 앞으로 어떻게 될지 2. 프론트엔드 개발자의 업무 범위 3. 잘하는 프론트엔드 개발자란?',
        tags: ['lorem', 'lorem', 'lorem'],
        date: 1,
        comment: 2
    },
]
const MyPage: NextPage = () => {
    return (
        <Container>
            <SearchBar />
            <FindPost />
            {cardData.map((e, index) => <MyCard key={index} imageUrl={SAMPLE_IMG} postTitle={e.postTitle} postDesc={e.postDesc} tags={e.tags} date={e.date} comment={e.comment}/>)}
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