import React, { useEffect, useState } from "react";
import MovieCard from "../../../../components/movieCard/MovieCard";
import { getTrendingMovies } from "../../../../components/api/api";
import InfiniteScroll from "react-infinite-scroll-component";

const RightPanel = ({ movieData, handleClick, isFetching }) => {
  console.log("Data Length: ", movieData.length);
  console.log("Scroller",movieData.length > 20 && (movieData.length%20 === 0 ? true : false));
  
  return (
    <InfiniteScroll
      dataLength={movieData.length}
      next={handleClick}
      hasMore={movieData.length > 20 && (movieData.length%20 === 0 ? true : false)}
      loader={isFetching && <h1>Loading...</h1>}
    >
      <div className="movie_detail_right">
        <div className="trending_scroller">
          {movieData?.map((movie) => (
            <MovieCard movie={movie} variant="full" />
          ))}
        </div>

        <div className="load_button_wrapper">
          <button className="load_button" onClick={handleClick}>
            Load More
          </button>
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default RightPanel;
