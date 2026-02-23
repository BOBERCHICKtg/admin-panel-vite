import { combineReducers } from "redux";
import { authReducer } from "./auth/auth-reducer";
import { postsReducer } from "./posts/posts-reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
