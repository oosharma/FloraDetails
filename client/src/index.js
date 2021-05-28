import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, Store, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducer as filters } from "./store/Filters/reducer";
import {reducer as auth} from "./store/Auth/reducer";

import {
  BrowserRouter as Router,
  Link,
  Route,
  useParams,
} from "react-router-dom";

import App2 from "./App2";
import Login from "./components/Login/Login";

import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  filters, auth
})
const store = createStore(rootReducer, applyMiddleware(thunk));
console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" exact >
        <App2 query={window.location.search} />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
