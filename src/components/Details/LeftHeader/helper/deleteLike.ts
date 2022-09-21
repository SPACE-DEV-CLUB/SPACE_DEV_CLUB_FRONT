import axios, { Method } from "axios";
import { mutate } from "swr";

import { API_ENDPOINT } from "@src/constants";

export const deleteLike = async (loggedUserLikepostId: number) => {
  mutate(
    `${API_ENDPOINT}/likeposts/${loggedUserLikepostId}`,
    fetcher(loggedUserLikepostId)
  );
};

const fetcher = async (loggedUserLikepostId: number) => {
  await axios({
    method: "delete" as Method,
    url: `${API_ENDPOINT}/likeposts/${loggedUserLikepostId}`,
  });
};
