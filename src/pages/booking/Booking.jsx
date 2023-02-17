import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTicketDetailApi } from "../../services/ticket";
import SeatDetail from "./components/seatDetail/SeatDetail";
import SeatList from "./components/seatList/SeatList";
import SeatListSelect from "./components/seatListSelect/SeatListSelect";

export default function Booking() {
  const [movieDetail, setMovieDetail] = useState({});
  const [seatList, setSeatList] = useState([]);
  const params = useParams();
  useEffect(() => {
    getTicketDetail();
  }, []);

  const getTicketDetail = async () => {
    const result = await fetchTicketDetailApi(params.showTimeId);
    setMovieDetail(result.data.content);
    // console.log(result.data.content);
  };
  return (
    <div className="py-5">
      <div className="row">
        <SeatList movieDetail={movieDetail} />
        <SeatListSelect movieDetail={movieDetail.thongTinPhim} />
      </div>
    </div>
  );
}
