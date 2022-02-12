import { fetcher } from "../../utils/fetcher";
import useSWRInfinite from "swr/infinite";
import { API_ENDPOINT } from "../../constants";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import qs from "qs";
import { MEDIA_QUERY_END_POINT } from "../../constants";
import { useSession } from "next-auth/react";

let PAGE_SIZE = 3;

export const ListCardContainer = () => {
  useEffect(() => {
    PAGE_SIZE = window.matchMedia(
      `(min-width: ${MEDIA_QUERY_END_POINT.XLARGE})`
    ).matches
      ? 5
      : window.matchMedia(`(min-width: ${MEDIA_QUERY_END_POINT.LARGE})`).matches
      ? 4
      : window.matchMedia(`(min-width: ${MEDIA_QUERY_END_POINT.TABLET})`)
          .matches
      ? 3
      : window.matchMedia(`(min-width: ${MEDIA_QUERY_END_POINT.MOBILE})`)
          .matches
      ? 2
      : 1;
    console.log(`window.innerWidth, ${window.innerWidth}`);
    console.log(`PAGE_SIZE ${PAGE_SIZE}`);
  }, []);

  const { data: session, status } = useSession();

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null;
    const query = qs.stringify(
      {
        pagination: {
          page: pageIndex,
          pageSize: PAGE_SIZE,
        },
        populate: ["*"],
        sort: ["publishedAt:desc"],
        filters: {
          userid: {
            email: {
              $eq: session?.user?.email,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
    return `${API_ENDPOINT}/readingposts?${query}`;
  };

  const { data, size, setSize, error, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  );

  session?.user?.email;

  return <></>;
};
