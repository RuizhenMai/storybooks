import { SET_PREV_URL } from "../actions/types";
import urlState from "../states/url";

export default function(state = urlState, action) {
  switch (action.type) {
    case SET_PREV_URL:
      return {
        ...state,
        referer: action.payload
      };
    default:
      return state;
  }
}
