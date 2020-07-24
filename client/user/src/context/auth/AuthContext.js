import React, { createContext, useReducer } from "react";
import config from "../../config";

import authReducer from "./authReducer";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

const initialState = {
  isAuth: false,
  authToken: "",
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: user,
    });
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

  const logout = () => {
    localStorage.removeItem("authToken");
    dispatch({
      type: LOGOUT,
    });
  };
  const setToken = (token) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authToken: state.authToken,
        isAuth: state.isAuth,
        signup,
        login,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
