import { PostAttr } from "@src/types/detail";
import { user } from "./user";

export const postInit: PostAttr = {
  title: "",
  contents: "",
  published: false,
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  url: "",
  private: false,
  description: "",
  likeposts: {
    data: [],
  },
  comments: {
    data: [
      {
        id: 0,
        attributes: {
          userid: 0,
          postid: 0,
          content: "",
          createdAt: "",
          depth: 0,
          order: 0,
          group: 0,
          is_deleted: false,
        },
      },
    ],
  },
  userid: {
    data: {
      id: 0,
      attributes: user,
    },
  },
  hashtags: {
    data: [
      {
        id: 0,
        attributes: {
          name: "",
          createdAt: "",
          description: "",
          image: "",
          posts: {
            data: [],
          },
        },
      },
    ],
  },
  photos: {
    data: [
      {
        id: 0,
        attributes: {
          src: "",
          createdAt: "",
        },
      },
    ],
  },
};
