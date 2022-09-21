import axios from "axios";

import { API_ENDPOINT } from "@src/constants";

export const getLoggedUserIsLike = async (
  loginUserId: number,
  postid: number,
  LoggedUserIsLike: () => void,
  handleLoggedUserLikepost: (likepostId: number) => void
) => {
  try {
    const res = await axios({
      method: "get",
      url: `${API_ENDPOINT}/likeposts?populate=*
            &filters[userid][id]=${loginUserId}
            &filters[postid][id]=${postid}`,
    });
    if (res.data.data.length > 0) {
      LoggedUserIsLike();
      handleLoggedUserLikepost(res.data.data[0].id);
    }
  } catch (err) {
    console.log(err);
  }
};
