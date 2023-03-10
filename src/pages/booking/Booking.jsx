import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../contexts/loading/LoadingContext";
import { fetchTicketDetailApi } from "../../services/ticket";
import SeatList from "./components/seatList/SeatList";
import SeatListSelect from "./components/seatListSelect/SeatListSelect";

export default function Booking() {
  const [movieDetail, setMovieDetail] = useState({});
  const [seatList, setSeatList] = useState([]);
  const params = useParams();
  const [_, setLoadingState] = useContext(LoadingContext);
  useEffect(() => {
    getTicketDetail();
  }, []);

  useEffect(() => {
    setLoadingState({ isLoading: true });
    if (movieDetail.danhSachGhe?.length) {
      setLoadingState({ isLoading: false });
    }
  }, [movieDetail]);

  const getTicketDetail = async () => {
    const result = await fetchTicketDetailApi(params.showTimeId);

    setMovieDetail(result.data.content);
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
      <div className="row mr-0">
        <SeatList
          handleSeatSelect={handleSeatSelect}
          movieDetail={movieDetail.danhSachGhe}
          seatList={seatList}
        />
        <SeatListSelect
          seatList={seatList}
          movieDetail={movieDetail.thongTinPhim}
        />
      </div>
    </div>
  );
}
