import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import rootReducer from "./rootReducer";
import reduxLogger from "redux-logger";
import createSaga from "redux-saga";
import RootSaga from "./rootSaga";
const sagaMiddleware = createSaga();
const middlewares = [reduxLogger, sagaMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistedStore = persistStore(store);
sagaMiddleware.run(RootSaga);
export default { store, persistedStore };
