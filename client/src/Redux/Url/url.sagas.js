/**
 * Sagas for URL API
 * Getting and setting the URL List
 */

import { takeEvery, put, all } from "redux-saga/effects";
import urlTypes from "./url.types";
import axios from "axios";
import { setShortUrl, setShortUrlList, setUrlError } from "./url.action";

//payload format {originalUrl,suggestedShortUrl}
function* asyncGetUrlFromServer({ payload }) {
  var suggestedShortUrl;
  if (payload.suggestedShortUrl) {
    suggestedShortUrl = payload.suggestedShortUrl;
  }
  try {
    const response = yield axios(`${process.env.REACT_APP_API_URL}/api/url`, {
      method: "POST",
      data: {
        originalUrl: payload.originalUrl,
        suggestedShortUrl
      },

      withCredentials: true
    });
    const data = response.data.data;
    yield put(setShortUrl(data));
    yield put(setUrlError(undefined));
  } catch (error) {
    console.log(error, error.message, error.response);
    yield put(setUrlError(error.response.data.message));
  }
}

function* asyncGetUrlListFromServer({ payload }) {
  const response = yield axios(`${process.env.REACT_APP_API_URL}/api/url`, {
    method: "GET",
    withCredentials: true
  });
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
