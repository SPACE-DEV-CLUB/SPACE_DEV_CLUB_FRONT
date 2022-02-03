import { MyCard } from "../MyCard"
import CardLoading from "../../Common/CardLoading"
import { fetcher } from "../../../utils/fetcher"
import useSWRInfinite from "swr/infinite"
import { API_ENDPOINT } from "../../../constants"
import { useEffect, useState } from "react"
import styled from "@emotion/styled"

const PAGE_SIZE = 2

interface ContentDataProps {
    username: string | string[] | undefined
}

export const ContentData = ({ username }: ContentDataProps) => {
    const getKey = (pageIndex: number, previousPageData: any) => {
        if (previousPageData && !previousPageData.data) return null
        return `${API_ENDPOINT}/posts?pagination[page]=${pageIndex}&pagination[pageSize]=${PAGE_SIZE}`
    }

    const { data, size, setSize, error, isValidating } = useSWRInfinite(
        getKey,
        fetcher
    )

    const isLoadingInitialData = !data && !error
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined")

    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

    const [target, setTarget] = useState<HTMLElement | null | undefined>(null)

    useEffect(() => {
        if (!target || isReachingEnd) return
        const observer = new IntersectionObserver(onIntersect, {
            threshold: 0.4,
        })
        observer.observe(target)
        return () => observer && observer.disconnect()
    }, [target])

    const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
        if (entry.isIntersecting) {
            setSize((prev) => prev + 1)
        }
    }

    return (
        <>
            <section>
                {data &&
                    data
                        .filter((e, i) => i != 0)
                        .map((loaded) => {
                            return loaded.data.map((e: any, i: number) => (
                                <MyCard
                                    key={i}
                                    imageUrl={e.attributes.imageUrl}
                                    title={e.attributes.title}
                                    contents={e.attributes.contents}
                                    tag={e.attributes.tag?.tags}
                                    date={e.attributes.publichedAt}
                                    // comment={e.attributes.comment}
                                    username={username}
                                />
                            ))
                        })}
            </section>
            <TargetElement ref={setTarget}>
                {isLoadingMore && !isReachingEnd && <CardLoading />}
            </TargetElement>
        </>
    )
}

const TargetElement = styled.article`
    width: 100%;
    height: 100px;
`
