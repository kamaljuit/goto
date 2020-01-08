import UrlTypes from "./url.types";
import userTypes from "../User/user.types";
/*
Format of url in urls list is [{originalUrl:"",shortenedUrl:""}]
*/
const INITIAL_STATE = {
  urls: [],
  error: undefined
};

/*
action recieves a single url from the backend
*/

function addUrlToUrlList(urls, url) {
  console.log(url, urls);
  const newUrlList = [...urls];
  console.log(newUrlList);

  newUrlList.push(url);
  console.log(newUrlList);
  return newUrlList;
}

const UrlReducer = (state = INITIAL_STATE, action) => {
  console.log(action, "debug");
  switch (action.type) {
    case UrlTypes.SET_SHORTENED_URL:
      return {
        ...state,
        urls: addUrlToUrlList(state.urls, action.payload)
      };
    case UrlTypes.SET_SHORTENED_URL_LIST:
      return {
        ...state,
        urls: action.payload
      };

    case UrlTypes.SET_URL_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case userTypes.LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default UrlReducer;
