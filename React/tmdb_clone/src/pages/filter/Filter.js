import React, { useEffect, useState } from "react";

import "./filter.css";
import { useParams } from "react-router-dom";
import LeftPanel from "../filter/components/leftPanel/LeftPanel";
import RightPanel from "../filter/components/rightPanel/RightPanel";

const Filter = () => {
  const [movieData, setMovieData] = useState([]);

  // function sortData(data) {
  //   data.sort(function (a, b) {
  //     if (a.name) {
  //       let x = a.name.toLowerCase();
  //       let y = b.name.toLowerCase();

  //       if (x < y) {
  //         return -1;
  //       } else if (x > y) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     } else {
  //       let x = a.english_name.toLowerCase();
  //       let y = b.english_name.toLowerCase();

  //       if (x < y) {
  //         return -1;
  //       } else if (x > y) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     }
  //   });
  //   return data;
  // }

  return (
    <div className="movie_content_wrapper">
      <div className="movie_content">
        <div className="title">
          <h2>Popular Movies</h2>
        </div>
        <div className="movie_detail">
          <LeftPanel setMovieData={setMovieData} />
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default Filter;
