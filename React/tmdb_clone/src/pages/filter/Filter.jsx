import React, { useEffect, useRef, useState } from 'react';

import './filter.css';
import { useParams } from 'react-router-dom';
import LeftPanel from './components/leftPanel/LeftPanel';
import RightPanel from './components/rightPanel/RightPanel';

function Filter() {
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(2);
  const infiniteRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false);
  const { category, subCategory } = useParams();
  const [title, setTitle] = useState('');

  function handleClick() {
    infiniteRef.current.handleLoadMore(page);
    setPage((page) => page + 1);
  }

  useEffect(() => {
    if (category === 'movie') {
      if (subCategory === 'popular') {
        setTitle('Popular Movies');
      } else if (subCategory === 'now_playing') {
        setTitle('Now Playing Movies');
      } else if (subCategory === 'upcoming') {
        setTitle('Upcoming Movies');
      } else if (subCategory === 'top_rated') {
        setTitle('Top Rated Movies');
      }
    } else if (category === 'tv') {
      if (subCategory === 'popular') {
        setTitle('Popular TV Shows');
      } else if (subCategory === 'airing_today') {
        setTitle('TV Shows Airing Today');
      } else if (subCategory === 'on_tv') {
        setTitle('Currently Airing TV Shows');
      } else if (subCategory === 'top_rated') {
        setTitle('Top Rated TV Shows');
      }
    }
  }, [category, subCategory]);

  return (
    <div className="movie_content_wrapper">
      <div className="movie_content">
        <div className="title">
          <h2>{title}</h2>
        </div>
        <div className="movie_detail">
          <LeftPanel
            setMovieData={setMovieData}
            movieData={movieData}
            ref={infiniteRef}
            setIsFetching={setIsFetching}
          />
          <RightPanel
            movieData={movieData}
            handleClick={handleClick}
            isFetching={isFetching}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
