import React, { useEffect, useState } from "react";
import MovieCard from "../../../../components/movieCard/MovieCard";
import { getTrendingMovies } from "../../../../components/api/api";

const RightPanel = () => {
  const [allTrendingMovies, setAllTrendingMovies] = useState([]);
  const [id, setId] = useState(1);

  useEffect(() => {
    let category = "day";
    async function getData() {
      const data = await getTrendingMovies(category);
      console.log(data);
      setAllTrendingMovies(data.results);
    }
    getData();
  }, [id]);
  return (
    <div className="movie_detail_right">
      <div className="trending_scroller">
        {allTrendingMovies?.map((movie) => (
          <MovieCard movie={movie} variant="full" />
        ))}
      </div>

      <div className="load_button_wrapper">
        <button className="load_button">Load More</button>
      </div>
    </div>
  );
};

export default RightPanel;
