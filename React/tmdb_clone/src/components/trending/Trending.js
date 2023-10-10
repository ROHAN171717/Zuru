import React, { useEffect, useState } from "react";
import SectionTitle from "../sectionTitle/SectionTitle";
import "./trending.css";
import MovieCard from "../movieCard/MovieCard";
import { getTrendingMovies } from "../api/api";

const Trending = () => {
  const [id, setId] = useState(1);
  const [allTrendingMovies, setAllTrendingMovies] = useState([]);

  useEffect(() => {
    let category = 'day';
    arr.map((item) => {
      if (id === item.id) {
        category = item.value;
      }
    });

    async function getData() {
      const data = await getTrendingMovies(category);
      console.log(data);
      setAllTrendingMovies(data.results);
      }
      getData();
  }, [id]);

  const arr = [
    { id: 1, name: "Today", value: "day" },
    { id: 2, name: "This Week", value: "week" },
  ];

  return (
    <section className="inner_content trending">
      <SectionTitle title="Trending" items={arr} setId={setId} />
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

export default Trending;
