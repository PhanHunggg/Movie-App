import { axiosRequest } from "../configs/axios.config";
import { GROUP_ID } from "../constants";

export const loginApi = (user) => {
  return axiosRequest({
    url: "/QuanLyNguoiDung/DangNhap",
    method: "POST",
    data: user,
  });
};

export const fetchUserListApi = () => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`,
    method: "GET",
  });
};

export const fetchTypeUserApi = () => {
  return axiosRequest({
    url: "/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
    method: "GET",
  });
};

export const addUserApi = (data) => {
  return axiosRequest({
    url: "/QuanLyNguoiDung/ThemNguoiDung",
    method: "POST",
    data,
  });
};

export const fetchUserInformationApi = (user) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${user}`,
    method: "POST",
  });
};

export const updateUserApi = (data) => {
  return axiosRequest({
    url: "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    method: "POST",
    data,
  });
};

export const deleteUserApi = (user) => {
  return axiosRequest({
    url: `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`,
    method: "DELETE",
  });
};
