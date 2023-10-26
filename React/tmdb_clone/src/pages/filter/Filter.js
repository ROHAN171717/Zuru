import React, { useEffect, useRef, useState } from "react";

import "./filter.css";
import { useParams } from "react-router-dom";
import LeftPanel from "../filter/components/leftPanel/LeftPanel";
import RightPanel from "../filter/components/rightPanel/RightPanel";

const Filter = () => {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(2);
  const infiniteRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);

  function handleClick() {
    infiniteRef.current.handleLoadMore(page);
    setPage(page => page + 1);
  }
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
          <LeftPanel setMovieData={setMovieData} movieData={movieData} ref={infiniteRef} setIsFetching={setIsFetching} />
          <RightPanel movieData={movieData} handleClick={handleClick} isFetching={isFetching} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
