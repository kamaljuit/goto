import { createSelector } from "reselect";
export const selectUrlState = state => state.Url;

export const selectUrlsList = createSelector([selectUrlState], Url => Url.urls);

export const selectUrlError = createSelector(
  [selectUrlState],
  Url => Url.error
);
