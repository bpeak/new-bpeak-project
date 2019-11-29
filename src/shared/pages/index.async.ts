import componentSplitting from "../lib/componentSplitting";

export const TestPage = componentSplitting(() => import("./TestPage"));
export const BoardPage = componentSplitting(() => import("./BoardPage"));
export const PostPage = componentSplitting(() => import("./PostPage"));
