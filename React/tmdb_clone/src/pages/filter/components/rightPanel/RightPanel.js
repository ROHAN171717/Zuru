import React, { useEffect, useState } from "react";
import MovieCard from "../../../../components/movieCard/MovieCard";
import { getTrendingMovies } from "../../../../components/api/api";
import InfiniteScroll from "react-infinite-scroll-component";
import Scroller from "../../../../components/scroller/Scroller";
import { useParams } from "react-router-dom";
import ShimmerCardEffect from "../../../../components/shimmerCardEffect/ShimmerCardEffect";

const RightPanel = ({ movieData, handleClick, isFetching }) => {
  const params = useParams();

  if (movieData.length === 0 && isFetching === false) {
    return (
      <p
        style={{
          marginLeft: "30px",
          fontSize: "20px",
        }}
      >
        No Data Found...
      </p>
    );
  }

  return (
    <InfiniteScroll
      dataLength={movieData.length}
      next={handleClick}
      hasMore={
        movieData.length > 20 && (movieData.length % 20 === 0 ? true : false)
      }
      loader={
        isFetching && (
          <>
            {[...Array(20)].map(() => (
              <ShimmerCardEffect variant="full" />
            ))}
          </>
        )
      }
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
          // isLoading={isFetching}
        />

        {movieData.length === 20 && (
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
