import React, { useState, useEffect } from "react";
import './popular.css'
import { getPopularMovies } from "../../../../components/api/api";
import MovieCard from "../../../../components/movieCard/MovieCard";
import SectionTitle from "../../../../components/sectionTitle/SectionTitle";

const Popular = () => {
  const [id, setId] = useState(1);
  const [allTrendingMovies, setAllTrendingMovies] = useState([]);

  useEffect(() => {
    let category = "popular";
    let tvShowOrMovie = "movie";

    arr.map((item) => {
      if (id === item.id) {
        category = item.value;
        tvShowOrMovie = item.type;
      }
    });

    async function getData() {
      const data = await getPopularMovies(category, tvShowOrMovie);
      console.log(data);
      setAllTrendingMovies(data.results);
      // getPopularMovies(category, tvShowOrMovie).then((res) => setAllTrendingMovies(res.results));
    }
    getData();
  }, [id]);

  const arr = [
    { id: 1, name: "Movie", type: "movie", value: "popular" },
    { id: 2, name: "On TV", type: "tv", value: "popular" },
    { id: 3, name: "In Theaters", type: "movie", value: "now_playing" },
  ];

  return (
    <section className="inner_content trending popular">
      <SectionTitle title="What's Popular" items={arr} setId={setId} />
      <div className="scroller_wrapper">
        <div className="trending_scroller">
          {allTrendingMovies?.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;
