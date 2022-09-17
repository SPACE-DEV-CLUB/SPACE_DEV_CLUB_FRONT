import { Post } from "./Post";

export interface Hashtags {
  id: number;
  attributes: {
    id?: string;
    name: string;
    createdAt: string;
    description: string;
    image: string;
    posts: {
      data: Post[];
    };
  };
}
