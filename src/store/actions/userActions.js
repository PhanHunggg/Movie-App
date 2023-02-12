import axios from "axios";
import { axiosRequest } from "../../configs/axios.config";
import { GROUP_ID } from "../../constants";
import {
  FETCH_BANNER_LIST,
  FETCH_COMMENT_LIST,
  FETCH_MOVIE_DETAIL,
  FETCH_MOVIE_LIST,
  FETCH_SHOWTIME,
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
      url: `/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`,
      method: "GET",
    });

    dispatch({
      type: FETCH_MOVIE_LIST,
      payload: result.data.content,
    });
  };
};

export const fetchCommentListAction = () => {
  return async (dispatch) => {
    const result = await axiosRequest({
      url: "/QuanLyPhim/LayDanhSachPhim?maNhom=GP05",
      method: "GET",
    });

    dispatch({
      type: FETCH_COMMENT_LIST,
      payload: result.data.content,
    });
  };
};

export const fetchShowtimeAction = (id) => {
  return async (dispatch) => {
    const result = await axiosRequest({
      url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
      method: "GET",
    });

    dispatch({
      type: FETCH_SHOWTIME,
      payload: result.data.content,
    });
  };
};

export const fetchMovieDetailAction = (id) => {
  return async (dispatch) => {
    const result = await axiosRequest({
      url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
      method: "GET",
    });

    dispatch({
      type: FETCH_MOVIE_DETAIL,
      payload: result.data.content,
    });
  };
};
