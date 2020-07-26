import React, { createContext, useReducer } from "react";
import config from "../../config";

import jobReducer from "./jobReducer";
import {} from "./types";

const initialState = {
  jobs: [],
  loading: false,
};

export const JobsContext = createContext(initialState);

export const JobsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  return (
    <JobsContext.Provider
      value={{
        jobs: state.jobs,
        loading: state.loading,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};
