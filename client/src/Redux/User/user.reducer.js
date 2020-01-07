import userTypes from "./user.types";
/*
  NOTE!!
  loginError and signupError will store the entire message.
*/

const INITIAL_USER = {
  user: null,
  loginError: null,
  signupError: null
};

const userReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case userTypes.LOGIN_USER:
      return {
        ...state,
        user: action.payload
      };

    case userTypes.LOGIN_USER_FAILED:
      return {
        ...state,
        loginError: action.payload
      };
    case userTypes.SIGNUP_USER_FAILED:
      return {
        ...state,
        signupError: action.payload
      };
    case userTypes.LOGOUT_USER:
      return INITIAL_USER;
    default:
      return state;
  }
};
export default userReducer;
