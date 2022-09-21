import axios from "axios";

import { API_ENDPOINT } from "@src/constants";

export const getLikeData = async (
  handleHeartNum: (currentHeartNum: number) => void,
  postid: number
) => {
  try {
    const res = await axios({
      method: "get",
      url: `${API_ENDPOINT}/likeposts?populate=*&filters[postid][id]=${postid}`,
    });
    handleHeartNum(res.data.data.length);
  } catch (err) {
    console.log(err);
  }
};
