import { all } from "redux-saga/effects";
import mySagas from "./maps";

export default function* rootSaga() {
  yield all([mySagas()]);
}
