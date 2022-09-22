import axios, { Method } from "axios";
import { mutate } from "swr";

import { API_ENDPOINT } from "@src/constants";

export const deleteLike = async (loggedUserLikepostId: number) => {
  const url = `${API_ENDPOINT}/likeposts/${loggedUserLikepostId}`;
  mutate(url, fetcher(url));
};

const fetcher = async (url: string) => {
  try {
    await axios({
      method: "delete" as Method,
      url,
    });
  } catch (err) {
    console.log(err);
  }
};
