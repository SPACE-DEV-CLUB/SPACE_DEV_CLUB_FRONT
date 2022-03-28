import useSWR from 'swr';
import qs from 'qs';
import axios, { Method } from 'axios';
import { fetcher } from '@utils/fetcher';
import { API_ENDPOINT } from '@constants/index';
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
  const query = qs.stringify({
    filters: {
      userid: {
        userid: userName,
      },
      postid: {
        id: postId,
      },
    },
  });

  const response = await axios({
    method: 'get',
    url: `${API_ENDPOINT}/readingposts?${query}`,
  });

  const { data } = response.data;

  data.length
    ? postReadingData('put', `${data[0].id}`, userId, postId)
    : postReadingData('post', '', userId, postId);
};

const postReadingData = async (
  method: string,
  putid: string = '',
  userId: number | undefined,
  postId: number
) => {
  const res = await axios({
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
