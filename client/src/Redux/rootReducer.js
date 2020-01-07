import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import urlReducer from "./Url/url.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage
  // whitelist:[],
  //   blacklist: [] //Reducer states to whitelist or blacklist
};
const rootReducer = combineReducers({
  User: userReducer,
  Url: urlReducer
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default persistedReducer;

export default rootReducer;
