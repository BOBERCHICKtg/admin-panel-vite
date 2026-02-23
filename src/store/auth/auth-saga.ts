import { call, put, takeLatest } from "redux-saga/effects";
import Cookies from "js-cookie";
import * as actions from "./auth-actions";
import { authAPI } from "../../api/endpoints";

function* loginSaga(action: any) {
  try {
    const response = yield call(authAPI.login, action.payload);
    Cookies.set("access_token", response.access_token);
    Cookies.set("refresh_token", response.refresh_token);
    yield put(actions.loginSuccess(response));
  } catch (error: any) {
    yield put(
      actions.loginFailure(
        error.response?.data?.message || "Ошибка авторизации",
      ),
    );
  }
}

function* logoutSaga() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
}

export function* authSaga() {
  yield takeLatest(actions.LOGIN_REQUEST, loginSaga);
  yield takeLatest(actions.LOGOUT, logoutSaga);
}
