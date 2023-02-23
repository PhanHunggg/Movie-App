import { axiosRequest } from "../configs/axios.config";

export const fetchTicketDetailApi = (id) => {
  return axiosRequest({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
    method: "GET",
  });
};

export const bookTicketApi = (data) => {
  return axiosRequest({
    url: "/QuanLyDatVe/DatVe",
    method: "POST",
    data,
  });
};

export const createShowTime = (data) => {
  return axiosRequest({
    url: "/QuanLyDatVe/TaoLichChieu",
    method: "POST",
    data,
  });
};
