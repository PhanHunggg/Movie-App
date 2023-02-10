import React from "react";
import Banner from "./components/banner/Banner";
import MovieList from "./components/movie-list/MovieList";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <MovieList />
    </div>
  );
}
