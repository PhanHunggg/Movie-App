import React from "react";
import "./movieDetail.scss";
import Detail from "./components/detail/Detail";
import Showtime from "./components/showtime/Showtime";
export default function MovieDetail() {
  return (
    <div className="movie_detail container py-5">
      <Detail />
      <Showtime />
    </div>
  );
}
