import axios from "axios";

import { API_ENDPOINT } from "@src/constants";

export const getLoggedUserIsLike = async (
  loginUserName: string,
  postid: number,
  LoggedUserIsLike: () => void
) => {
  try {
    const res = await axios({
      method: "get",
      url: `${API_ENDPOINT}/likeposts?populate=*
            &filters[userid][userid]=${loginUserName}
            &filters[postid][id]=${postid}`,
    });
    res.data && LoggedUserIsLike();
  } catch (err) {
    console.log(err);
  }
};
