import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuth: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("authToken", action.payload);
      return {
        ...state,
        authToken: action.payload,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        authToken: "",
      };
    default:
      return state;
  }
};
