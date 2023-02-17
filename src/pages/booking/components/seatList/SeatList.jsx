import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTicketDetailApi } from "../../../../services/ticket";
import Seat from "./Seat";

export default function SeatList(props) {
  const renderSeatList = () => {
    return props.movieDetail?.map((ele, idx) => {
      return (
        <React.Fragment key={ele.maGhe}>
          <Seat ele={ele} />
          {(idx + 1) % 16 === 0 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="col-8">
      <div style={{ width: "95%" }} className="mx-auto">
        {renderSeatList()}
      </div>
    </div>
  );
}
