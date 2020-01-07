import { createSelector } from "reselect";
export const selectUser = state => state.User;

export const selectCurrentUser = createSelector(
  [selectUser],
  User => User.user
);

export const selectLoginError = createSelector(
  [selectUser],
  user => user.loginError
);

export const selectSignupError = createSelector(
  [selectUser],
  user => user.signupError
);
