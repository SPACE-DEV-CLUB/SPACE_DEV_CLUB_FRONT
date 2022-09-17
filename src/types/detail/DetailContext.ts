import { Post, PostAttr } from "@src/types/detail";

export interface DetailContext {
  postid: number;
  postObj: PostAttr;
  random_interested: Post[];
  loginUserId: number;
  loginUserName: string;
}
