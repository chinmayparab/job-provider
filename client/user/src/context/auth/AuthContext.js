import React, { createContext, useReducer } from "react";
import config from "../../config";

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
  authToken: localStorage.getItem("authToken"),
  user: null,
  error: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load userr
  const loadUser = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(config.server + "/user", requestOptions)
      .then((response) => response.json())
      .then((result) => dispatch({ type: USER_LOADED, payload: result[0] }))
      .catch((err) => console.log(err));
  };

  const signup = (user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      passw: user.passw,
      contact: user.contact,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(config.server + "/register", requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: user,
        })
      )
      .catch((err) => console.log(err));
  };

  const login = (user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      // username: user.id,
      password: user.password,
      type: 1,
      contact: user.contact,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(config.server + "/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setToken(result.token);
      })
      .catch((err) => console.log(err));
  };

  const setToken = (token) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
    loadUser(token);
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authToken: state.authToken,
        isAuth: state.isAuth,
        error: state.error,
        signup,
        login,
        setToken,
        loadUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
