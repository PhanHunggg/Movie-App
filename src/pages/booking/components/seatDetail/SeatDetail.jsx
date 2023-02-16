import React from "react";

export default function SeatDetail() {
  return (
    <div className="col-8 mb-4">
      <div style={{ width: "95%" }} className="mx-auto">
        <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-secondary">
          Seats are booked
        </div>
        <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-dark">
          Seats not booked
        </div>
        <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-primary">
          Seats are being booked
        </div>
        <div className="mr-1 mb-1 d-inline-block p-2 rounded text-white bg-warning">
          VIP seats
        </div>
      </div>
    </div>
  );
}
