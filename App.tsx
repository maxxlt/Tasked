import React, { useState, useEffect, useContext } from "react";
import { Provider } from "react-redux";
import Navigator from "./navigation/Navigator";
import { rrfProps, store } from "./config/firebase.js";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import Store from "./reducers/Store";

 const App = () => {

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
export default App
