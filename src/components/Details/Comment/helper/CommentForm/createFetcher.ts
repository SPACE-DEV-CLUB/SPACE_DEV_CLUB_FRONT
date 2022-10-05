import axios, { Method } from "axios";

interface DataProps {
  userid: number;
  postid: number;
  content: string;
  depth: number;
  order: number;
  group: number;
  is_deleted: boolean;
  posts: number;
}

export const createFetcher = async (Data: DataProps, url: string) => {
  try {
    await axios({
      method: "post" as Method,
      url,
      data: {
        data: Data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
