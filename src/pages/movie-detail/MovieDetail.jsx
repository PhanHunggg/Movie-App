import React from "react";
import "./movieDetail.scss";
import Detail from "./components/detail/Detail";
import Showtime from "./components/showtime/Showtime";
export default function MovieDetail() {
  return (
    <div style={{ padding: "190px 0 50px" }} className="movie_detail container">
      <Detail />
      <Showtime />
    </div>
  );
}
