import { all, call } from "redux-saga/effects";
import UserSaga from "../Redux/User/user.sagas";
import UrlSaga from "../Redux/Url/url.sagas";
export default function* RootSaga() {
  yield all([call(UrlSaga), call(UserSaga)]);
}
