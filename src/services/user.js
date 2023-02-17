
import { axiosRequest } from "../configs/axios.config";

export const loginApi = (user) => {
  return axiosRequest({
    url: "/QuanLyNguoiDung/DangNhap",
    method: "POST",
    data: user,
  });
};
