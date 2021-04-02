import React from "react";
import { Provider } from "react-redux";
import Navigator from "./navigation/Navigator";
import { rrfProps, store } from "./config/firebase.js";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import Store from "./reducers/Store";

export default class App extends React.Component {
  render() {
    return (
      <Store>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <Navigator />
          </ReactReduxFirebaseProvider>
        </Provider>
      </Store>
    );
  }
}
