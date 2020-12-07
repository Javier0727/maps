import { call, put, takeLatest } from "redux-saga/effects";
import apiCall from "../api";

function* fetchMaps({ payload }) {
  try {
    const request = yield call(
      apiCall,
      "GET",
      "https://pokeapi.co/api/v2/pokemon"
    );
    yield put({ type: "DUMY_ASYNC", payload: request.data });
  } catch (e) {
    // yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* mySaga() {
  yield takeLatest("DUMY", fetchMaps);
}

export default mySaga;
