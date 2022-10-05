import { useContext, useEffect, useState } from "react";

import { useData } from "@src/hooks";
import { SeriesBox } from "@src/types/detail";
import { seriesInit } from "@src/constants/detail";

import { PostStore } from "../../Context";

export const useGetSeriesData = () => {
  const [seriesData, setSeriesData] = useState(seriesInit);
  const [currentPost, setCurrentPost] = useState(0);
  const { postid, postObj } = useContext(PostStore);
  const { id: postUserId } = postObj.userid.data;

  const path = "series-boxes";
  const query = `populate=*&filters[userid][id]=${postUserId}&filters[post][id]=${postid}`;
  const { data: series } = useData(path, query);

  const handleSeriesData = async (seriesData: SeriesBox) => {
    if (seriesData) {
      setSeriesData(seriesData);
    }
  };

  const handleCurrentPost = (seriesData: SeriesBox) => {
    if (seriesData.title) {
      seriesData.post.data.some((data, i) => {
        if (data.id === postid) {
          setCurrentPost(i + 1);
          return true;
        }
      });
    }
  };

  useEffect(() => {
    if (series && series.data.length > 0) {
      const seriesData = series.data[0].attributes;
      handleSeriesData(seriesData);
      handleCurrentPost(seriesData);
    }
  }, [series]);

  return { seriesData, currentPost };
};
