export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const fetchPostsRequest = (page: number = 1) => ({
  type: FETCH_POSTS_REQUEST,
  payload: page,
});
export const fetchPostsSuccess = (response: any) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: response,
});
export const fetchPostsFailure = (error: string) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});
export const setCurrentPage = (page: number) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
