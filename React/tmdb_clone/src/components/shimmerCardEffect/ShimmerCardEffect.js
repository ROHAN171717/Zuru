import React from "react";
import CircularProgressBar from "../circularProgressBar/CircularProgressBar";

const ShimmerCard = ({ variant }) => {
  const percentage = 0;
  return (
    <div className={`movie_card ${variant}`}>
      <div className="movie_card_image">
        <div>
          {/* <a href={`/detail`}> */}
          <img
            className={`poster no_img ${variant}`}
            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
            alt="no_img"
          />
          {/* </a> */}
        </div>
        <div className="options"></div>
      </div>
      <div className={`movie_card_content ${variant}`}>
        {!(variant === "small") && (
          <CircularProgressBar percentage={percentage} />
        )}
      </div>
    </div>
  );
};

ShimmerCard.defaultProps = {
  variant: "default",
};

export default ShimmerCard;
