import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { API_ENDPOINT } from "@src/constants";
import useIntersectionObserver from "@hooks/useIO";
import { ThemeContext } from "../../pages/_app";
import { CardProps } from "@src/types/Main";
import { ThemeProps } from "@src/types/Theme";
import { fetcher } from "@utils/fetcher";
import SkeletonLoading from "../Common/SkeletonLoading";
import { MyCard } from "../MyPage/MyCard";
import { FindPost } from "./FindPost";
import { SearchBar } from "./SearchBar";

type MapType = {
    attributes: {
        content: string;
    };
};
type FilterType = {
    attributes: {
        title: string;
        contents: string;
    };
};

function SearchFilter() {
    const { theme } = useContext(ThemeContext);
    const router = useRouter();
    const res = router.query.q;
    const [filteredData, setFilteredData] = useState<CardProps[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemIndex, setItemIndex] = useState(1);
    // const dataList = data.data.data;
    const { data, error, isValidating } = useSWR(
        `${API_ENDPOINT}/posts?populate=*`,
        fetcher
    );

    useEffect(() => {
        {
            if (!isValidating && router.query.username) {
                setFilteredData(
                    data.data
                        ?.filter(
                            (e: any) =>
                                e.attributes.userid.data?.attributes.userid ==
                                router.query.username
                        )
                        .filter(
                            (e: FilterType) =>
                                e.attributes.title.includes(res as string) ||
                                e.attributes.contents.includes(res as string)
                        )
                );
            } else if (!isValidating) {
                setFilteredData(
                    data.data?.filter(
                        (e: FilterType) =>
                            e.attributes.title.includes(res as string) ||
                            e.attributes.contents.includes(res as string)
                    )
                );
            }
        }
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
                                        // 이후에 수정
                                        imageUrl={e.attributes?.imageurl as any}
                                        userid={e.attributes.userid.data.attributes.userid}
                                        title={e.attributes.title}
                                        contents={e.attributes.contents}
                                        tag={e.attributes.hashtags?.data}
                                        date={e.attributes.createdAt}
                                        comment={e.attributes.comments?.data.map(
                                            (e: MapType, i: number) => (
                                                <div key={i}>
                                                    {e?.attributes?.content}
                                                </div>
                                            )
                                        )}
                                        commentLength={
                                            e.attributes.comments?.data.length
                                        }
                                        username={
                                            e.attributes.userid?.data
                                                ?.attributes?.userid
                                        }
                                        mySearch={true}
                                        isPrivate={e.attributes.private}
                                        profileImg={
                                            e.attributes.userid.data?.attributes
                                                .profileimage
                                        }
                                        url={e.attributes?.url}
                                    />
                                ))}
                        </>
                    ) : (
                        <NoResult theme={theme}>검색 결과가 없습니다</NoResult>
                    )}
                    <div ref={setTarget}>{isLoaded && <SkeletonLoading />}</div>
                </CardContainer>
            )}
        </>
    );
}

export default SearchFilter;

const CardContainer = styled.div``;

const NoResult = styled.div<ThemeProps>`
    padding-top: 18px;
    font-size: 18px;
    color: ${({ theme }) => theme.SUB_FONT};
`;
