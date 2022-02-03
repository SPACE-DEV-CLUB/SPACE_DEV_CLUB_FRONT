type CardComments = {
  data: {
    attributes: {
      content: string
    }
    length: number | string | undefined
  }
}
type MapType = {
  attributes:{
      content: string;
  }
}
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
        hashtags: {
            data: string[] | undefined;
        };
        createdAt: string;
        comments: {
          data: string | any
        };
        userid: {
          data: {
            attributes: {
              nickname: string,
              profileimage: string
            }
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
