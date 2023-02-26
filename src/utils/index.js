import moment from "moment";

export const formatDate = (date) => {
  return moment(new Date(date)).format("DD/MM/yyyy hh:mm:ss");
};


export const formatDateShowTime = (date) => {
  return moment(new Date(date)).format("DD/MM/yyyy hh:mm");
};