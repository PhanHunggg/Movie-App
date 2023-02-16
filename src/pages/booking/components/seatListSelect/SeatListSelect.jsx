import React, { useState } from "react";

export default function SeatListSelect(props) {
  console.log(props.movieDetail);
  return (
    <div className="col-3">
      <img
        style={{ width: 300, height: 400, objectFit: "cover" }}
        src={props.movieDetail?.hinhAnh}
        alt="#"
      />
      <h4 className="mb-0">{props.movieDetail?.tenPhim}</h4>
      <h5 className="mb-0">
        Number of seats:
        <div className="d-flex">
          <p className="badge badge-success mr-2 mb-0">13</p>
          <p className="badge badge-success mr-2 mb-0">14</p>
        </div>
      </h5>
      <h5>Total: 40000</h5>
      <button className="btn btn-warning">BOOK</button>
    </div>
  );
}
