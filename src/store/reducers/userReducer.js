import {
  FETCH_BANNER_LIST,
  FETCH_MOVIE_LIST,
  SET_USER_INFO,
} from "../types/userType";

const DEFAULT_STATE = {
  userInfo: null,
  bannerList: [],
  movieList: [],
};
if (localStorage.getItem("USER_INFO_KEY")) {
  DEFAULT_STATE.userInfo = JSON.parse(localStorage.getItem("USER_INFO_KEY"));
}
export const userReducer = (state = DEFAULT_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_USER_INFO:
      state.userInfo = payload;

      break;

    case FETCH_BANNER_LIST:
      state.bannerList = payload;
      break;
    case FETCH_MOVIE_LIST:
      state.movieList = payload;
      break;
    default:
      break;
  }
  return { ...state };
};
