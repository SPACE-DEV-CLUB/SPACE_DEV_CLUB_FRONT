import { userInfo } from './Main';

export interface Hashtags {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    description: string;
    image: string;
  };
}

export interface Photos {
  id: number;
  attributes: {
    src: string;
    createdAt: string;
  };
}
export interface Post {
  id: number;
  attributes: {
    title: string;
    contents: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    url: string;
    private: null;
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
      data: [];
    };
    hashtags: {
      data: Hashtags[];
    };
    photos: {
      data: Photos[];
    };
  };
}

export interface CommentUser {
  id: number;
  attributes: {
    userid: string;
    profileimage: string;
  };
}

export interface CommentData {
  id: number;
  attributes: {
    userid: number;
    postid: number;
    content: string;
    createdAt: string;
    depth: number;
    order: number;
    group: number;
    is_deleted: boolean;
  };
}

export interface SeriesBox {
  title: string;
  userid: {
    data: {
      id: number;
      attributes: {
        userid: string;
      };
    };
  };
  post: {
    data: SeriesBoxPost[];
  };
}

export interface SeriesBoxPost {
  id: number;
  attributes: {
    title: string;
    url: string;
  };
}
