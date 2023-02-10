import axios from "axios";
import { axiosRequest } from "../../configs/axios.config";
import {
  FETCH_BANNER_LIST,
  FETCH_MOVIE_LIST,
  SET_USER_INFO,
} from "../types/userType";

export const setUserAction = (payload) => {
  return {
    type: SET_USER_INFO,
    payload,
  };
};

export const fetchBannerAction = () => {
  return async (dispatch) => {
    const result = await axiosRequest({
      url: "/QuanLyPhim/LayDanhSachBanner",
      method: "GET",
    });

    dispatch({
      type: FETCH_BANNER_LIST,
      payload: result.data.content,
    });
  };
};

export const fetchMovieListAction = () => {
  return async (dispatch) => {
    const result = await axiosRequest({
      url: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      method: "GET",
    });

    dispatch({
      type: FETCH_MOVIE_LIST,
      payload: result.data.content,
    });
  };
};
