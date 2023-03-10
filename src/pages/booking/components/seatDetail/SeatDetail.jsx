import React from "react";

export default function SeatDetail() {
  return (
    <div className="col-8 mb-4 options__seat mx-auto" style={{ width: "95%" }}>
      <span className="mr-1 mb-1 d-inline-block p-2 rounded background-danger">
        Ghế đã bán
      </span>
      <span className="mr-1 mb-1 d-inline-block p-2 rounded background-success">
        Ghế đang chọn
      </span>
      <span className="mr-1 mb-1 d-inline-block p-2 rounded text-dark color__notBooked__bScreen">
        Có thể chọn
      </span>
      <span className="mr-1 mb-1 d-inline-block p-2 rounded background-warning">
        Ghế VIP
      </span>
    </div>
  );
}
