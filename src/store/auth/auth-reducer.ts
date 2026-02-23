import Cookies from "js-cookie";
import * as actions from "./auth-actions";

const initialState = {
  isAuthenticated: !!Cookies.get("access_token"),
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, loading: false, error: null };
    case actions.LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actions.LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
