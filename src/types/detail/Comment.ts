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
