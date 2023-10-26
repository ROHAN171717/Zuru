import React from "react";
import "./scroller.css";
import MovieCard from "../movieCard/MovieCard";
import RecommendationCard from "../recommendationCard/RecommendationCard";

const Scroller = ({ data, variant, movieCardVariant, category }) => {
  return (
    <div className={`scroller_wrapper ${variant}`}>
      <div className={`trending_scroller ${variant}`}>
        {movieCardVariant === "recommendations"
          ? data?.map((movie) => (
              <RecommendationCard
                data={movie}
                variant={movieCardVariant}
                category={category}
              />
            ))
          : data?.map((movie) => (
              <MovieCard
                movie={movie}
                variant={movieCardVariant}
                category={category}
              />
            ))}
        {movieCardVariant === "full" &&
          data.length % 5 !== 0 &&
          [...Array(5 - (data.length % 5))].map(() => (
            <div style={{ width: "180px" }}></div>
          ))}
      </div>
    </div>
  );
};

Scroller.defaultProps = {
  variant: "default",
};

export default Scroller;
