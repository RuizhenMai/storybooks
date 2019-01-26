import { SET_PREV_URL } from "../actions/types";

export const setReferer = url => {
  return {
    type: SET_PREV_URL,
    payload: url
  };
};
