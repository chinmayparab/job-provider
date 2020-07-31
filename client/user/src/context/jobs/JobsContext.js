import React, { createContext, useReducer } from "react";
import config from "../../config";

import jobsReducer from "./jobsReducer";
import { FETCH_JOBS, SET_LOADING, SET_CURRENT, CLEAR_CURRENT } from "./types";

const initialState = {
  jobs: [],
  job: {},
  loading: false,
  current: {},
};

export const JobsContext = createContext(initialState);

export const JobsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobsReducer, initialState);

  const fetchJobs = () => {
    setLoading();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      location: "",
      title: "",
      start: "120000",
      end: "900000",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(config.server + "/fetch-jobs", requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({
          type: FETCH_JOBS,
          payload: result,
        })
      )
      .catch((err) => console.log(err));
  };

  const searchJobs = (data) => {
    setLoading();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      location: data.location,
      title: data.title,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(config.server + "/fetch-jobs", requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({
          type: FETCH_JOBS,
          payload: result,
        })
      )
      .catch((err) => console.log(err));
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  // Set Current Job
  const setCurrent = (job) => {
    dispatch({ type: SET_CURRENT, payload: job });
  };

  // Clear Current Job
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  return (
    <JobsContext.Provider
      value={{
        job: state.job,
        jobs: state.jobs,
        loading: state.loading,
        current: state.current,
        fetchJobs,
        searchJobs,
        setLoading,
        setCurrent,
        clearCurrent,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};
