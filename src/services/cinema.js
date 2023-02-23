import { axiosRequest } from "../configs/axios.config";

export const fetchCinemaComplexApi = (id) => {
  return axiosRequest({
    url: `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`,
    method: "GET",
  });
};

export const fetchCinemaSystemApi = () => {
  return axiosRequest({
    url: "/QuanLyRap/LayThongTinHeThongRap",
    method: "GET",
  });
};
