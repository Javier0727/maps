import { all } from "redux-saga/effects";
import { mySagas, mySagaData } from "./maps";

export default function* rootSaga() {
  yield all([mySagas(), mySagaData()]);
}
