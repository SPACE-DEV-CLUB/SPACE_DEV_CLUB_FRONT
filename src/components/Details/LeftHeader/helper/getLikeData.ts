import axios, { Method } from "axios";
import { mutate } from "swr";

import { API_ENDPOINT } from "@src/constants";

export const getLikeData = async (
  handleHeartNum: (currentHeartNum: number) => void,
  postid: number
) => {
  const url = `${API_ENDPOINT}/likeposts?populate=*&filters[postid][id]=${postid}`;
  const { data: likepost } = await mutate(url, fetcher(url));
  handleHeartNum(likepost.data.length);
};

const fetcher = async (url: string) => {
  try {
    const res = await axios({
      method: "get" as Method,
      url,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
