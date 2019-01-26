import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";
import urlReducer from "./store/reducers/urlReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// Create Store Method takes in this as @param

const rootReducer = combineReducers({
  auth: authReducer,
  url: urlReducer
});

const middleware = [thunk];

const makeStore = (initialState, options) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};

export default makeStore;
