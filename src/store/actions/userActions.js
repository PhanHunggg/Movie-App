import { SET_USER_INFO } from "../types/userType";

export const setUserAction = (payload) => {
  return {
    type: SET_USER_INFO,
    payload,
  };
};
