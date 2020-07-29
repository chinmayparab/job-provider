import {
  FETCH_RESUME,
  RESUME_ERROR,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_RESUME:
      return {
        ...state,
        resume: action.payload,
      };

    case RESUME_ERROR:
      return {
        ...state,
        error: action.payload,
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
