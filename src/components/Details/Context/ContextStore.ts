import { createContext } from "react";

import { postInit } from "@src/constants/detail";
import { DetailContext } from "@src/types/detail/DetailContext";

export const PostStore = createContext<DetailContext>({
  postid: 0,
  postObj: postInit,
  random_interested: [],
  loginUserId: 0,
  loginUserName: "",
});
