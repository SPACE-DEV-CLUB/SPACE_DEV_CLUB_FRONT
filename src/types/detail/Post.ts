import { userInfo } from "../Main";
import { CommentData } from "./Comment";
import { Hashtags } from "./Hashtag";
import { Photos } from "./Photo";

export interface Post {
  id: number;
  attributes: PostAttr;
}

export interface PostAttr {
  title: string;
  contents: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  url: string;
  private: boolean;
  description: string;
  userid: {
    data: {
      id: number;
      attributes: userInfo;
    };
  };
  likeposts: {
    data: [];
  };
  comments: {
    data: CommentData[];
  };
  hashtags: {
    data: Hashtags[];
  };
  photos: {
    data: Photos[];
  };
}
