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
        user: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("authToken", action.payload);
      return {
        ...state,
        isAuth: true,
        authToken: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("authToken");
      return {
        ...state,
        // error: action.payload,
        isAuth: false,
        authToken: "",
        user: null,
      };
    default:
      return state;
  }
};
