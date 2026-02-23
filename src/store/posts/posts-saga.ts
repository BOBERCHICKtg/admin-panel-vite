import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./posts-actions";
import { postsAPI } from "../../api/endpoints";

function* fetchPostsSaga(action: any) {
  try {
    const response = yield call(postsAPI.getPosts, action.payload);
    yield put(actions.fetchPostsSuccess(response));
  } catch (error: any) {
    yield put(
      actions.fetchPostsFailure(
        error.response?.data?.message || "Ошибка загрузки",
      ),
    );
  }
}

export function* postsSaga() {
  yield takeLatest(actions.FETCH_POSTS_REQUEST, fetchPostsSaga);
}
