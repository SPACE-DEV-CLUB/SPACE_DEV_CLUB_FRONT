import { Post } from "@src/types/detail";

export const shuffle = (arr: Post[]) => arr.sort(() => Math.random() - 0.5);
