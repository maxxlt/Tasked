import React from 'react';
import {withAuthenticator} from 'aws-amplify-react-native';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);
import NavContainer from './Screens/Navigation/NavContainer';


const App = () => {
  return (
      <NavContainer/>
   );
}


export default withAuthenticator(App, { includeGreetings: true });
