import axios, { Method } from "axios";

import { API_ENDPOINT } from "@src/constants";
import { mutate } from "swr";

export const postLike = (
  loginUserId: number,
  postid: number,
  handleLoggedUserLikepost: (likepostId: number) => void
) => {
  const url = `${API_ENDPOINT}/likeposts`;
  mutate(url, fetcher(loginUserId, postid, handleLoggedUserLikepost));
};

const fetcher = async (
  loginUserId: number,
  postid: number,
  handleLoggedUserLikepost: (likepostId: number) => void
) => {
  try {
    const url = `${API_ENDPOINT}/likeposts`;
    const options = {
      data: {
        userid: loginUserId,
        postid: postid,
      },
    };

    const res = await axios({
      method: "post" as Method,
      url,
      data: options,
    });
    handleLoggedUserLikepost(res.data.data.id);
  } catch (err) {
    console.log(err);
  }
};
