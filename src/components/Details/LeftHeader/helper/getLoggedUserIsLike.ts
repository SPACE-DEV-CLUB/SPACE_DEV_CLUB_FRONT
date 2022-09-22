import axios, { Method } from "axios";
import { mutate } from "swr";

import { API_ENDPOINT } from "@src/constants";

export const getLoggedUserIsLike = async (
  loginUserId: number,
  postid: number,
  LoggedUserIsLike: () => void,
  handleLoggedUserLikepost: (likepostId: number) => void
) => {
  const url = `${API_ENDPOINT}/likeposts?populate=*
&filters[userid][id]=${loginUserId}
&filters[postid][id]=${postid}`;
  const { data: loggedUserLikepost } = await mutate(url, fetcher(url));
  if (loggedUserLikepost.data.length > 0) {
    LoggedUserIsLike();
    handleLoggedUserLikepost(loggedUserLikepost.data[0].id);
  }
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
