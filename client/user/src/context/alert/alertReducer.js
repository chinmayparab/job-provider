import { SET_ALERT, REMOVE_ALERT } from "./types";

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alertOpen: true,
        alertMsg: action.payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alertOpen: false,
        alertMsg: action.payload,
      };
    default:
      return state;
  }
};
