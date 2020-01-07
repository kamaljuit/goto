import { takeLatest, put, all } from "redux-saga/effects";
import { setCurrentUser, setLoginError, logoutUser } from "./user.action";
import UserTypes from "./user.types";
import axios from "axios";
function* loginUserAsync(action) {
  try {
    const response = yield axios(`/api/user/login`, {
      method: "POST",
      data: {
        email: action.payload.email,
        password: action.payload.password
      }
    });
    console.log(response, "res");

    const user = response.data.user;

    yield put(setCurrentUser(user));

    // } else {
    //   const responseJSON = yield response.json();
    //   yield put(setLoginError(responseJSON));
    // }
  } catch (error) {
    console.log(error.name, error.stack);
    yield put(logoutUser());
    yield put(setLoginError(error.response.data.data.message));
  }
}

function* signupUserAsync(action) {
  try {
    const response = yield axios(`/api/user/signup`, {
      method: "POST",
      withCredentials: true,
      data: {
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password
      }
    });
    const user = response.data.data.user;
    yield put(setCurrentUser(user));
  } catch (error) {
    yield put(setLoginError(error.response.data.message));
    yield put(logoutUser());
  }
}

export default function* UserSaga() {
  yield all([
    takeLatest(UserTypes.LOGIN_USER_START, loginUserAsync),
    takeLatest(UserTypes.SIGNUP_USER_START, signupUserAsync)
  ]);
}
