import React, {useEffect} from 'react';
import {withAuthenticator} from 'aws-amplify-react-native';
import Amplify from '@aws-amplify/core';
import config from './aws-exports';
import {
   
   API,
   graphqlOperation,
 } from 'aws-amplify';
Amplify.configure(config);
import NavContainer from './Screens/Navigation/NavContainer';
import {getUser} from './src/graphql/queries';
import {createUser} from './src/graphql/mutations';

const App = () => {
   
  return (
      <NavContainer/>
   );
}


export default withAuthenticator(App, { includeGreetings: true });
