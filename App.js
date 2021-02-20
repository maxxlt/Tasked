import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import Navigator from "./navigation/Navigator";
import reducer from "./reducers";

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

// import React, { Component } from "react";
// import { View, TextField, Text, Button } from "react-native-ui-lib";

// export default class Example extends Component {
//   render() {
//     return (
//       <View flex paddingH-25 paddingT-120>
//         <Text blue50 text20>
//           Welcome
//         </Text>
//         <TextField text50 placeholder="username" dark10 />
//         <TextField text50 placeholder="password" secureTextEntry dark10 />
//         <View marginT-100 center>
//           <Button text70 white background-orange30 label="Login" />
//           <Button link text70 orange30 label="Sign Up" marginT-20 />
//         </View>
//       </View>
//     );
//   }
// }
