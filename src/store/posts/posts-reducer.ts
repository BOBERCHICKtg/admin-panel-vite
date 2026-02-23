import * as actions from "./posts-actions";

const initialState = {
  posts: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    pageCount: 1,
    totalCount: 0,
  },
};

export const postsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.FETCH_POSTS_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.data,
        pagination: action.payload.pagination,
        loading: false,
        error: null,
      };
    case actions.FETCH_POSTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actions.SET_CURRENT_PAGE:
      return {
        ...state,
        pagination: { ...state.pagination, currentPage: action.payload },
      };
    default:
      return state;
  }
};
