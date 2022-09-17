import { DetailContext } from "@src/types/detail/DetailContext";

import { PostStore } from "./ContextStore";

interface Props extends DetailContext {
  children: JSX.Element;
}

export const PostProvider = ({
  children,
  postid,
  postObj,
  random_interested,
  loginUserId,
  loginUserName,
}: Props) => (
  <PostStore.Provider
    value={{
      postid,
      postObj,
      random_interested,
      loginUserId,
      loginUserName,
    }}
  >
    {children}
  </PostStore.Provider>
);
