import { useData } from "@src/hooks";
import { useEffect } from "react";

export const useGetLikeData = async (
  handleHeartNum: (currentHeartNum: number) => void,
  postid: number
) => {
  const path = "likeposts";
  const query = `populate=*&filters[postid][id]=${postid}`;
  const { data: likepost } = useData(path, query);

  useEffect(() => {
    if (likepost) {
      handleHeartNum(likepost.data.length);
    }
  }, [likepost]);
};
