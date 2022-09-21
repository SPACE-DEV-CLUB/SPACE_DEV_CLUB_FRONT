import axios, { Method } from "axios";

import { API_ENDPOINT } from "@src/constants";
import { mutate } from "swr";

export const postLike = (
  loginUserId: number,
  postid: number,
  handleLoggedUserLikepost: (likepostId: number) => void
) => {
  mutate(
    `${API_ENDPOINT}/likeposts`,
    fetcher(loginUserId, postid, handleLoggedUserLikepost)
  );
};

const fetcher = async (
  loginUserId: number,
  postid: number,
  handleLoggedUserLikepost: (likepostId: number) => void
) => {
  const options = {
    data: {
      userid: loginUserId,
      postid: postid,
    },
  };

  const res = await axios({
    method: "post" as Method,
    url: `${API_ENDPOINT}/likeposts`,
    data: options,
  });
  handleLoggedUserLikepost(res.data.data.id);
};
