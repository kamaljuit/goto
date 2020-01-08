import UrlTypes from "./url.types";

//urlData format {originalUrl,suggestedShortUrl}

export const getShortUrlFromServer = urlData => {
  return {
    type: UrlTypes.GET_SHORTENED_URL_FROM_SERVER,
    payload: urlData
  };
};

//format of urlData {originalUrl,shortenedUrl}

export const setShortUrl = urlData => {
  return {
    type: UrlTypes.SET_SHORTENED_URL,
    payload: urlData
  };
};

export const setShortUrlList = urlList => {
  return {
    type: UrlTypes.SET_SHORTENED_URL_LIST,
    payload: urlList
  };
};

export const getShortenedUrlList = () => {
  return {
    type: UrlTypes.GET_SHORTENED_URL_LIST,
    payload: null
  };
};

export const setUrlError = errorMessage => {
  return {
    type: UrlTypes.SET_URL_ERROR,
    payload: errorMessage
  };
};
