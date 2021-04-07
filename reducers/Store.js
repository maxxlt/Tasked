import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

import { auth } from "../config/firebase";
const initialState = {
  currentUser: null,
  selectedGroup: null,
  userInitial:  null,
  error: null,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
