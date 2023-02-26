import React from "react";
import "./movieDetail.scss";
import Detail from "./components/detail/Detail";
import Showtime from "./components/showtime/Showtime";
export default function MovieDetail() {
  return (
    <div style={{backgroundColor: "#232946"}} className="movie_detail">
      <div style={{ padding: "180px 0 50px" }} className=" container">
        <Detail />
        <Showtime />
      </div>
    </div>
  );
}
