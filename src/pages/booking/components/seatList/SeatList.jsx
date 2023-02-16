import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTicketDetailApi } from "../../../../services/ticket";
import SeatDetail from "../seatDetail/SeatDetail";
import Seat from "./Seat";

export default function SeatList(props) {
  console.log(props);

  const renderSeatList = () => {
    return props.movieDetail?.danhSachGhe?.map((ele, idx) => {
      console.log(ele);
      return (
        <React.Fragment key={ele.maGhe}>
          <Seat ele={ele} />
          {(idx + 1) % 20 === 0 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="col-9">
      <div style={{ width: "80%" }} className="mx-auto seat__all">
        {renderSeatList()}
      </div>
      <div className="screen">Màn hình</div>
      <SeatDetail />
    </div>
  );
}
