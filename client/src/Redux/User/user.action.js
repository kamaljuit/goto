import userTypes from "./user.types";

/*
Format of data:{
  email:
  password:
}
*/

export const loginUserStart = data => {
  return {
    type: userTypes.LOGIN_USER_START,
    payload: data
  };
};

/*
Format of data:{
  name:
  email:
  password:
}
*/
export const signupUserStart = data => {
  return {
    type: userTypes.SIGNUP_USER_START,
    payload: data
  };
};

export const setCurrentUser = user => {
  return {
    type: userTypes.LOGIN_USER,
    payload: user
  };
};

export const setLoginError = error => {
  return {
    type: userTypes.LOGIN_USER_FAILED,
    payload: error
  };
};

export const setSignupError = error => {
  return {
    type: userTypes.SIGNUP_USER_FAILED,
    payload: error
  };
};

export const logoutUser = () => {
  return {
    type: userTypes.LOGOUT_USER,
    payload: ""
  };
};

export const logoutUserStart = () => {
  return {
    type: userTypes.LOGOUT_USER_START,
    payload: ""
  };
};
