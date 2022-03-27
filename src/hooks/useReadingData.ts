import { API_ENDPOINT } from '@constants/index';
import axios, { Method } from 'axios';
import { ListPost } from '@src/types/Main';

interface useReadingDataProps {
  userName: string | string[] | undefined;
  userId: number | undefined;
  postId: number;
}

const useReadingData = async ({
  userName,
  userId,
  postId,
}: useReadingDataProps) => {
  let putId = 0;
  const response = await axios({
    method: 'get',
    url: `${API_ENDPOINT}/readingposts?populate=*&filters[userid][userid]=${userName}`,
  });
  const handleOverlap = response.data.data.some((post: ListPost) => {
    if (post.attributes.postid.data !== null) {
      if (post.attributes.postid.data.id === postId) {
        putId = post.id;
        return true;
      }
    }
  });
  handleOverlap
    ? postReadingData('put', `${putId}`, userId, postId)
    : postReadingData('post', '', userId, postId);
};

const postReadingData = async (
  method: string,
  putid: string = '',
  userId: number | undefined,
  postId: number
) => {
  await axios({
    method: method as Method,
    url: `${API_ENDPOINT}/readingposts/${putid}`,
    data: {
      data: {
        userid: userId,
        postid: postId,
      },
    },
  });
};

export default useReadingData;
