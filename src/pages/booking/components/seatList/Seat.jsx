import React, { useState } from "react";
import "../../booking.scss";

export default function Seat(props) {
  const [isSelected, setIsSelected] = useState(false);

  const populateClassName = () => {
    if (props.ele.daDat) return "btn-danger";

    if (isSelected) return "btn-success";

    if (props.ele.loaiGhe === "Vip") return "btn-warning";

    return "color__notBooked";
  };

  const handleSelectSeat = () => {
    setIsSelected(!isSelected);
    props.handleSeatSelect(props.ele);
  };

  return (
    <button
      onClick={handleSelectSeat}
      disabled={props.ele.daDat}
      className={`${populateClassName()} seat`}
    >
      {props.ele.tenGhe}
    </button>
  );
}
