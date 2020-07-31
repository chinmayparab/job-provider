import React, { createContext, useReducer } from "react";

import { SET_ALERT, REMOVE_ALERT } from "./types";
import AlertReducer from "./alertReducer";

const initialState = {
  alertOpen: false,
  alertMsg: "",
};

export const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const showAlert = (msg) => {
    dispatch({
      type: SET_ALERT,
      payload: msg,
    });
  };

  const hideAlert = () => {
    dispatch({
      type: REMOVE_ALERT,
      payload: "",
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alertOpen: state.alertOpen,
        alertMsg: state.alertMsg,
        showAlert,
        hideAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
