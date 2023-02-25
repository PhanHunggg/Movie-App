import React from "react";
import Banner from "./components/banner/Banner";
import Comment from "./components/comments/comment";
import MovieListBottom from "./components/list-bottom/MovieListBottom";
import MovieList from "./components/movie-list/MovieList";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <MovieList />
      <MovieListBottom />
      <Comment />
    </div>
  );
}
