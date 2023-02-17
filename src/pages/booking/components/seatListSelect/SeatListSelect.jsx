import React, { useState } from "react";

export default function SeatListSelect(props) {
  console.log(props.movieDetail);
  return (
    <div className="col-3 seat__selected">
      <img
        style={{ width: 240, height: 355, objectFit: "cover", marginLeft: 35 }}
        src={props.movieDetail?.hinhAnh}
        alt="#"
      />
      <h4 className="mb-3 name__film mt-2">{props.movieDetail?.tenPhim}</h4>
      <div className="ticket__info">
        <div className="dotted-line">
          <b>Rạp: Rạp 8 | BHD Star Cineplex - 3/2</b>
        </div>
        <div className="dotted-line">
          <b>Xuất chiếu: 01:11 | 24/11/2022</b>
        </div>
        <div className="dotted-line">
          <b>Ghế: </b>
        </div>
      </div>
      <div className="ticket__price">
        <p>Tổng: 4000 VNĐ</p>
      </div>
      <button className="btn btn-warning button__booking">BOOK</button>
    </div>
  );
}
