import React, { createContext, useReducer } from "react";

import authReducer from "./authReducer";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
} from "./types";

const initialState = {
  isAuth: false,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: state.isAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
