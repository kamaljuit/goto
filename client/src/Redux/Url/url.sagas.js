import { takeEvery, put, all } from "redux-saga/effects";
import urlTypes from "./url.types";
import axios from "axios";
import { setShortUrl, setShortUrlList } from "./url.action";

//payload format {originalUrl,suggestedShortUrl}
function* asyncGetUrlFromServer({ payload }) {
  var suggestedShortUrl;
  if (payload.suggestedShortUrl) {
    suggestedShortUrl = payload.suggestedShortUrl;
  }
  const response = yield axios(`/api/url`, {
    method: "POST",
    data: {
      originalUrl: payload.originalUrl,
      suggestedShortUrl
    },

    withCredentials: true
  });
  const data = response.data.data;
  console.log(data);
  yield put(setShortUrl(data));
}

function* asyncGetUrlListFromServer({ payload }) {
  const response = yield axios(`/api/url`, {
    method: "GET",
    withCredentials: true
  });
  console.log(response, "Short Url List from server");
  const data = response.data.data;
  yield put(setShortUrlList(data));
}

function* UrlSaga() {
  yield all([
    takeEvery(urlTypes.GET_SHORTENED_URL_FROM_SERVER, asyncGetUrlFromServer),
    takeEvery(urlTypes.GET_SHORTENED_URL_LIST, asyncGetUrlListFromServer)
  ]);
}

export default UrlSaga;
