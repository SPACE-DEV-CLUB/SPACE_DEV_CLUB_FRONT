import type { NextPage } from "next";
import styled from "@emotion/styled";
import { SearchBar } from "../../components/Search/SearchBar";
import { FindPost } from "../../components/Search/FindPost";
import { MyCard } from "../../components/MyPage/MyCard";
import { MEDIA_QUERY_END_POINT } from "../../constants";
import { CARD_DATA } from "../../data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CardProps } from "../../types/Main";
import Head from "next/head";
import { useContext } from "react";
import { ThemeContext } from "../../pages/_app";
import { ThemeProps } from "../../types/Theme";
import { Header } from "../../components/Common/Header";
import useIntersectionObserver from "../../hooks/useIO";

const MyPage: NextPage = () => {
    const { theme } = useContext(ThemeContext);
    const router = useRouter();
    const res = router.query.q;
    const [filteredData, setFilteredData] = useState<CardProps[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemIndex, setItemIndex] = useState(1);

    useEffect(() => {
        setFilteredData(
            CARD_DATA.filter(
                (e) =>
                    e.postDesc.includes(res as string) ||
                    e.postTitle.includes(res as string)
            )
        );
    }, [res]);

    const timeoutFetcher = (delay = 500) =>
        new Promise((res) => setTimeout(res, delay));

    const getMoreItem = async () => {
        setIsLoaded(true);
        await timeoutFetcher();
        setItemIndex((i) => i + 1);
        setIsLoaded(false);
    };

    const onIntersect: IntersectionObserverCallback = async (
        [entry],
        observer
    ) => {
        if (entry.isIntersecting && !isLoaded && filteredData.length) {
            if (itemIndex < 3) {
                observer.unobserve(entry.target);
                await getMoreItem();
            }
        }
    };

    const { setTarget } = useIntersectionObserver({
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
        onIntersect,
    });

    return (
        <>
            <Head>
                {res ? (
                    <title>&quot;{res}&quot; 검색 결과 - sdv</title>
                ) : (
                    <title>sdv</title>
                )}
            </Head>
            <Header username={"deli-ght"} user={false} />
            <Container>
                <SearchBar />
                {res && (
                    <CardContainer>
                        {filteredData.length ? (
                            <>
                                <FindPost postNum={filteredData.length} />
                                {filteredData
                                    .slice(0, itemIndex * 5)
                                    .map((e, index) => (
                                        <MyCard
                                            key={index}
                                            imageUrl="/public/image/sample.jpeg"
                                            postTitle={e.postTitle}
                                            postDesc={e.postDesc}
                                            tags={e.tags}
                                            date={e.date}
                                            comment={e.comment}
                                            username={"jae04099"}
                                            mySearch={true}
                                        />
                                    ))}
                            </>
                        ) : (
                            <NoResult theme={theme}>
                                검색 결과가 없습니다
                            </NoResult>
                        )}
                        <div ref={setTarget}>
                            {isLoaded && <Loader>Loading..</Loader>}
                        </div>
                    </CardContainer>
                )}

                {/* {DETAIL_CARD_DATA.map((e, index) => (
        <DetailCard
          key={`${e}_${index}`}
          margin="0"
          padding="0"
          postIdx={e.postIdx}
          postTitle={e.postTitle}
          postDesc={e.postDesc}
          date={e.date}
        />
      ))} */}
                {/* <SeriesCard
                imageUrl="/public/image/sample.jpeg"
                postTitle="제목입니다. 제목."
                count
                updateDate
            /> */}
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
const Loader = styled.div`
    width: 100%;
    height: 50px;
    bottom: 0;
    right: 0;
    line-height: 50px;
    position: absolute;
    text-align: center;
    align-items: center;
    color: white;
    background: black;
    font-size: 40px;
`;

const CardContainer = styled.div``;

const NoResult = styled.div<ThemeProps>`
    padding-top: 18px;
    font-size: 18px;
    color: ${({ theme }) => theme.SUB_FONT};
`;
