/**
 * User Saga to log-in and log-out the user and handle important Redux state
 * to maintain the authentication of the user
 * Only responsible for the API call and not any validataion or data sanitization
 */
import { takeLatest, put, all } from "redux-saga/effects";
import {
  setCurrentUser,
  setLoginError,
  logoutUser,
  setSignupError
} from "./user.action";
import { getShortenedUrlList } from "../../Redux/Url/url.action";

import UserTypes from "./user.types";
import axios from "axios";
function* loginUserAsync(action) {
  console.log(process.env.REACT_APP_API_URL, "URL");
  try {
    const response = yield axios(
      `${process.env.REACT_APP_API_URL}/api/user/login`,
      // `/api/user/login`,

      {
        method: "POST",
        data: {
          email: action.payload.email,
          password: action.payload.password
        }
      }
    );

    const user = response.data.data;

    yield put(setCurrentUser(user));
    yield put(getShortenedUrlList());
  } catch (error) {
    yield put(logoutUser());
    yield put(setLoginError(error.response.data.message));
  }
}

function* signupUserAsync(action) {
  try {
    const response = yield axios(
      `${process.env.REACT_APP_API_URL}/api/user/signup`,
      // `/api/user/signup`,

      {
        method: "POST",
        withCredentials: true,
        data: {
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password
        }
      }
    );
    const user = response.data.data;
    yield put(setCurrentUser(user));
  } catch (error) {
    console.log(error, error.response);
    yield put(logoutUser());
    yield put(setSignupError(error.response.data.message));
  }
}

function* logoutUserAsync() {
  try {
    const response = yield axios(
      `${process.env.REACT_APP_API_URL}/api/user/logout`,
      // `/api/user/logout`,

      {
        method: "GET",
        withCredentials: true
      }
    );
    yield put(logoutUser());
  } catch (error) {
    yield put(logoutUser());
  }
}

export default function* UserSaga() {
  yield all([
    takeLatest(UserTypes.LOGIN_USER_START, loginUserAsync),
    takeLatest(UserTypes.SIGNUP_USER_START, signupUserAsync),
    takeLatest(UserTypes.LOGOUT_USER_START, logoutUserAsync)
  ]);
}
