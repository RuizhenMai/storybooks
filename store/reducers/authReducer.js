import { SET_CURRENT_USER } from "../actions/types";
import authState from "../states/auth";
import isEmpty from "../../utils/isEmpty";

export default function(state = authState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload || ""
      };
    default:
      return state;
  }
}
