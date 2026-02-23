export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const loginRequest = (credentials: any) => ({
  type: LOGIN_REQUEST,
  payload: credentials,
});
export const loginSuccess = (tokens: any) => ({
  type: LOGIN_SUCCESS,
  payload: tokens,
});
export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
export const logout = () => ({ type: LOGOUT });
