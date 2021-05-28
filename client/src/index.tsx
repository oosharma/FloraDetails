import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, Store, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {reducer as filters} from "./store/Filters/reducer";
import {reducer as auth} from "./store/Auth/reducer";
 


import App from "./App";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  filters, auth
})
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App query={window.location.search} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
