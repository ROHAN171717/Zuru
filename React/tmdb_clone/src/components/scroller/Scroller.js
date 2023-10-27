import React, { useEffect } from "react";
import "./scroller.css";
import MovieCard from "../movieCard/MovieCard";
import RecommendationCard from "../recommendationCard/RecommendationCard";
import ShimmerCardEffect from "../shimmerCardEffect/ShimmerCardEffect";
import ShimmerRecommendationEffect from "../shimmerRecommendationEffect/ShimmerRecommendationEffect";

const Scroller = ({
  data,
  variant,
  movieCardVariant,
  category,
  isCategoryChanged = true,
  isLoading = false,
}) => {
  return (
    <div
      className={`scroller_wrapper ${variant} ${
        isCategoryChanged === true ? "scroller_transition" : ""
      }`}
    >
      <div className={`trending_scroller ${variant}`}>
        {isLoading === true ? (
          <>
            {[...Array(20)].map(() =>
              movieCardVariant === "recommendations" ? (
                <ShimmerRecommendationEffect />
              ) : (
                <ShimmerCardEffect variant={movieCardVariant} />
              )
            )}
          </>
        ) : (
          <>
            {movieCardVariant === "recommendations"
              ? data?.map((movie) => (
                  <RecommendationCard
                    data={movie}
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
          </>
        )}
      </div>
    </div>
  );
};

Scroller.defaultProps = {
  variant: "default",
};

export default Scroller;
