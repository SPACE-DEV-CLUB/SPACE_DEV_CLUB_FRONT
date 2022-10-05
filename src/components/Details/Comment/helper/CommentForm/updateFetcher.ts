import axios, { Method } from "axios";

export const updateFetcher = async (url: string, commentText: string) => {
  try {
    const Data = {
      content: commentText,
    };
    await axios({
      method: "put" as Method,
      url,
      data: {
        data: Data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
