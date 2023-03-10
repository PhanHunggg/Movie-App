import React, { useEffect, useState } from "react";

import SeatDetail from "../seatDetail/SeatDetail";
import Seat from "./Seat";

export default function SeatList(props) {
  const renderSeatListSelect = () => {
    return props.seatList.map((ele) => {
      return (
        <React.Fragment key={ele.maGhe}>
          <p className="badge badge-success mr-2 mb-0">{ele.tenGhe}</p>
        </React.Fragment>
      );
    });
  };

  const renderSeatList = () => {
    return props.movieDetail?.map((ele, idx) => {
      return (
        <React.Fragment key={ele.maGhe}>
          <Seat handleSeatSelect={props.handleSeatSelect} ele={ele} />
          {(idx + 1) % 16 === 0 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="col-9">
      <div className="seat__border">
        <h2>Chọn ghế: {renderSeatListSelect()}</h2>
        <div style={{ width: "80%" }} className="seat__all">
          {renderSeatList()}
        </div>
        <div className="screen">Màn hình</div>
        <SeatDetail />
      </div>
    </div>
  );
}
