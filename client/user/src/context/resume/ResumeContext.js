import React, { createContext, useReducer } from "react";
import config from "../../config";

import resumeReducer from "./resumeReducer";
import { FETCH_RESUME, RESUME_ERROR } from "./types";

const initialState = {
  resume: {},
  error: null,
};

export const ResumeContext = createContext(initialState);

export const JobsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  //   Fetchin The Whole Frigggggggin Resume
  const fetchResume = () => {
    setLoading();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    var raw = JSON.stringify({
      want: "everything",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(config.server + "/resume-details", requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({
          type: FETCH_RESUME,
          payload: result,
        })
      )
      .catch((err) =>
        dispatch({
          type: RESUME_ERROR,
          payload: err,
        })
      );
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ResumeContext.Provider
      value={{
        resume: state.resume,
        error: state.error,
        fetchResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
