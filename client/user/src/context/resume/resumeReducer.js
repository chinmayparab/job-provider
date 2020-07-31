import {
  FETCH_RESUME,
  RESUME_ERROR,
  SET_LOADING,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_EDU,
  ADD_JOBS,
  ADD_PROJECTS,
  ADD_WORKEX,
  ADD_SKILLS,
  ADD_TRAININGS,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_RESUME:
      return {
        ...state,
        resume: action.payload,
      };

    case ADD_EDU:
    case ADD_JOBS:
    case ADD_PROJECTS:
    case ADD_SKILLS:
    case ADD_TRAININGS:
    case ADD_WORKEX:
      return {
        ...state,
        error: null,
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
