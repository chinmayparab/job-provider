import {
  FETCH_JOBS,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT,
  FETCH_APPLIED_JOBS,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case FETCH_APPLIED_JOBS:
      return {
        ...state,
        appliedJobs: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    default:
      return state;
  }
};
