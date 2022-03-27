type CardComments = {
  data: {
    attributes: {
      content: string;
    };
    length: number | string | undefined;
  };
};
type MapType = {
  attributes: {
    content: string;
  };
};
export interface Main {
  name: string | undefined;
  born: string;
  died: string;
  bio: {
    text: string;
    url: string;
  };
  id: number;
}
export interface CardProps {
  imageUrl: string;
  postTitle: string;
  postDesc: string;
  tags: string[];
  date: number;
  comment: number;
  postNum?: number;
  attributes: {
    title: string;
    contents: string;
    url: string | undefined | null;
    imageurl: string | undefined;
    hashtags: {
      data: string[] | undefined;
    };
    createdAt: string;
    comments: {
      data: string | any;
    };
    userid: {
      data: {
        attributes: {
          userid: string;
          profileimage: string;
        };
      };
    };
    private: boolean;
  };
}

export interface DetailCardProps {
  margin?: string;
  padding?: string;
  opacity?: boolean;
  imageUrl?: string;
  postIdx: number;
  postTitle: string;
  postDesc: string;
  date: string;
  id?: number | string;
}

export interface TagsProps {
  tagImage?: string;
  tagName: string;
  tagDesc?: string;
  tagCount: number;
}

export interface userInfo {
  email: string;
  userid: string;
  profile: string;
  profileimage: string;
  facebook: string;
  home: string;
  twitter: string;
  github: string;
  velogtitle: string;
  profilename: string;
  aboutme: string;
  snsemail: string;
  readingpost?: any[];
}
export interface Post {
  contents: string;
  createdAt: string;
  description: string;
  postidx: number;
  private: boolean;
  publishedAt: string;
  series_box: SeriesBox | undefined | null;
  title: string;
  updatedAt: string;
  url: string;
  userid: {
    data: {
      attributes: userInfo;
    };
  };
  likeposts: {
    data: [];
  };
  comments: {
    data: [];
  };
}

export interface ListPost {
  id: number;
  attributes: {
    postid: {
      data: {
        id: number;
        attributes: Post;
      };
    };
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SeriesBox {
  createdAt: string;
  publishedAt: string;
  title: string;
  updatedAt: string;
}

export interface PostProps {
  id: number;
  attributes: Post;
}
