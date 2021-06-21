import { v4 } from "uuid";

export const createSlug = (title: string): string => {
  return title.toLowerCase().split(" ").join("-") + "-" + v4().split("-")[0];
};
