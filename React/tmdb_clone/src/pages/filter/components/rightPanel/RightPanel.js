import React, { useEffect, useState } from "react";
import MovieCard from "../../../../components/movieCard/MovieCard";
import { getTrendingMovies } from "../../../../components/api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Scroller from "../../../../components/scroller/Scroller";
import { useParams } from "react-router-dom";

const RightPanel = ({ movieData, handleClick, isFetching }) => {
  const params = useParams();
  console.log("Data Length: ", movieData.length, movieData.length % 5);
  console.log(
    "Scroller",
    movieData.length > 20 && (movieData.length % 20 === 0 ? true : false)
  );

  return (
    <InfiniteScroll
      dataLength={movieData.length}
      next={handleClick}
      hasMore={
        movieData.length > 20 && (movieData.length % 20 === 0 ? true : false)
      }
      loader={isFetching && <h1>Loading...</h1>}
    >
      <div className="movie_detail_right">
        {/* <div className="trending_scroller">
          {movieData?.map((movie) => (
            <MovieCard movie={movie} variant="full" />
          ))}
          {movieData.length % 5 !== 0 &&
            [...Array(5 - (movieData.length % 5))].map(() => (
              <div style={{ width: "180px" }}></div>
            ))}
        </div> */}
        <Scroller
          data={movieData}
          variant="full"
          movieCardVariant="full"
          category={params.category}
        />

        {movieData.length >= 20 && (
          <div className="load_button_wrapper">
            <button className="load_button" onClick={handleClick}>
              Load More
            </button>
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
};

export default RightPanel;
