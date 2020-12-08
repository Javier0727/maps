import { put, takeLatest } from "redux-saga/effects";
import {
  SET_CLIENT_NAME,
  SET_CLIENT_NAME_ASYNC,
  SET_ROUTES_DATA,
  SET_ROUTES_DATA_ASYNC,
} from "../store/actions";

function* setClientName({ clientName }) {
  try {
    yield put({ type: SET_CLIENT_NAME_ASYNC, payload: { name: clientName } });
  } catch (e) {
    console.log(e);
  }
}

export function* mySagas(props) {
  console.log(props);
  yield takeLatest(SET_CLIENT_NAME, setClientName);
}

function* setRoutesData({ data }) {
  try {
    yield put({ type: SET_ROUTES_DATA_ASYNC, payload: data });
  } catch (e) {
    console.log(e);
  }
}

export function* mySagaData() {
  yield takeLatest(SET_ROUTES_DATA, setRoutesData);
}
