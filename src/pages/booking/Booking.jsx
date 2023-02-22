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

  const handleSeatSelect = (seat) => {
    const data = [...seatList];
    const idx = data.findIndex((ele) => ele.maGhe === seat.maGhe);

    if (idx !== -1) {
      data.splice(idx, 1);
    } else {
      data.push(seat);
    }

    setSeatList(data);
  };
  return (
    <div style={{ padding: "165px 0 60px" }} className="booking">
      <div className="row">
        <SeatDetail />
        <SeatList
          handleSeatSelect={handleSeatSelect}
          movieDetail={movieDetail.danhSachGhe}
        />
        <SeatListSelect
          seatList={seatList}
          movieDetail={movieDetail.thongTinPhim}
        />
      </div>
    </div>
  );
}
