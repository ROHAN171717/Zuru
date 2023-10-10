import React from "react";
import "./movieCard.css";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MovieCard = ({ movie }) => {
  const percentage = Math.round(movie.vote_average * 10);
  return (
    <div className="movie_card">
      <div className="movie_card_image">
        <div className="wrapper">
          <a>
            <img
              className="poster"
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
            />
          </a>
        </div>
        <div className="options"></div>
      </div>
      <div className="movie_card_content">
        <div class="circular_progressbar">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            background
            backgroundPadding={3}
            strokeWidth={7}
            styles={buildStyles({
              backgroundColor: "#081c22",
              textColor: "#fff",
              // pathColor: "#498C4C",
              pathColor:  percentage <= 25 ? "#388E3C" : percentage <= 50 ? "#66BB6A" : percentage <= 75 ? "#8BC34A" : "#FFF176",
              trailColor: "#6F6F6F",
            })}
          />
        </div>
        <h2>
          <a>{movie.title || movie.name}</a>
        </h2>
        <p>{movie.release_date || movie.first_air_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
