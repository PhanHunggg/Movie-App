import {
  FETCH_BANNER_LIST,
  FETCH_CHAIR_LIST,
  FETCH_COMMENT_LIST,
  FETCH_MOVIE_DETAIL,
  FETCH_MOVIE_LIST,
  FETCH_SHOWTIME,
  SET_USER_INFO,
} from "../types/userType";

const DEFAULT_STATE = {
  userInfo: null,
  bannerList: [],
  movieList: [],
  commentList: [],
  showTimeList: [],
  movieDetail: null,
  chairList: [],
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

    case FETCH_COMMENT_LIST: {
      state.commentList = payload;
      break;
    }

    case FETCH_SHOWTIME: {
      state.showTimeList = payload;
      break;
    }

    case FETCH_MOVIE_DETAIL: {
      state.movieDetail = payload;
      break;
    }
    case FETCH_CHAIR_LIST: {
      state.chairList = payload;
      break;
    }
    default:
      break;
  }
  return { ...state };
};
