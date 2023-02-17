import React, { useState } from "react";
import * as _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { bookTicketApi } from "../../../../services/ticket";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";

export default function SeatListSelect(props) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const params = useParams();
  const navigate = useNavigate();
  const renderSeatListSelect = () => {
    return props.seatList.map((ele) => {
      return (
        <React.Fragment key={ele.maGhe}>
          <p className="badge badge-success mr-2 mb-0">{ele.tenGhe}</p>
        </React.Fragment>
      );
    });
  };

  const bookTicket = async () => {
    const data = {
      maLichChieu: params.showTimeId,
      danhSachVe: props.seatList.map((ele) => {
        return {
          maGhe: ele.maGhe,
          giaVe: ele.giaVe,
        };
      }),
    };

    await bookTicketApi(data);
    Toast.fire({
      icon: "success",
      title: "Bạn đã đặt vé thành công",
    });

    navigate("/");
  };

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
          <b>
            Rạp: {props.movieDetail?.tenRap} | {props.movieDetail?.tenCumRap}
          </b>
        </div>
        <div className="dotted-line">
          <b>
            Xuất chiếu: {props.movieDetail?.gioChieu} |{" "}
            {props.movieDetail?.ngayChieu}
          </b>
        </div>
        <div className="dotted-line">
          <b>Ghế: {renderSeatListSelect()}</b>
        </div>
      </div>
      <div className="ticket__price">
        <p>
          Tổng:{" "}
          <span>
            {_.sumBy(props.seatList, "giaVe").toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </p>
      </div>
      <button onClick={bookTicket} className="btn btn-warning button__booking">
        BOOK
      </button>
    </div>
  );
}
