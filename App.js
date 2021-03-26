import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import Navigator from "./navigation/Navigator";
import reducer from "./reducers";
import { rrfProps, store } from "./config/firebase.js";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

const middleware = applyMiddleware(thunkMiddleware);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Navigator />
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}
