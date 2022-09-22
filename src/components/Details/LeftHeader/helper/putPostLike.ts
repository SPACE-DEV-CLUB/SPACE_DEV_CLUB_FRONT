import axios, { Method } from "axios";

import { API_ENDPOINT } from "@src/constants";

export const putPostLike = async (
  type: "like" | "unlike",
  postid: number,
  heartNum: number
) => {
  try {
    await axios({
      method: "put" as Method,
      url: `${API_ENDPOINT}/posts/${postid}`,
      data: {
        data: {
          likes: type === "like" ? heartNum + 1 : heartNum - 1,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};
