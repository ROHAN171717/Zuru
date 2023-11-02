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
  handleScroll
}) => {
  // const trendingScroller = document.querySelectorAll(".trending_scroller");
  // const scrollerWrapper = document.querySelector(".scroller_wrapper");
  // var prevScrollpos = trendingScroller && trendingScroller.scrollLeft;
  // function handleScroll() {
  //   var currentScrollPos = trendingScroller.scrollLeft;
  //   console.log(
  //     prevScrollpos,
  //     currentScrollPos,
  //     currentScrollPos - prevScrollpos
  //   );

  //   console.log(window.getComputedStyle(scrollerWrapper, "::after").content);
  //   if (currentScrollPos > prevScrollpos && currentScrollPos > 25) {
  //     console.log("Inside If");
  //     document
  //       .querySelector(".scroller_wrapper")
  //       .style.setProperty("--content", " ");
  //   } else if (currentScrollPos === 0) {
  //     document
  //       .querySelector(".scroller_wrapper")
  //       .style.setProperty("--content", "");
  //   }

  //   prevScrollpos = currentScrollPos;
  // }

  return (
    <div
      className={`scroller_wrapper ${variant} ${
        isCategoryChanged === true ? "scroller_transition" : ""
      }`}
    >
      <div
        className={`trending_scroller ${variant}`}
        onScroll={() => handleScroll()}
      >
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
                  <RecommendationCard data={movie} category={category} />
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
