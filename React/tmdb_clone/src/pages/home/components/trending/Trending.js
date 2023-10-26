import React, { useEffect, useState } from "react";
import SectionTitle from "../../../../components/sectionTitle/SectionTitle";
import "./trending.css";
import MovieCard from "../../../../components/movieCard/MovieCard";
import { getTrendingMovies } from "../../../../components/api/api";
import Scroller from "../../../../components/scroller/Scroller";
import { formateDateString } from "../../../../helper";

const Trending = () => {
  const [id, setId] = useState(1);
  const [allTrendingMovies, setAllTrendingMovies] = useState([]);

  useEffect(() => {
    let category = "day";
    arr.forEach((item) => {
      if (id === item.id) {
        category = item.value;
      }
    });

    async function getData() {
      const data = await getTrendingMovies(category);
      const refactoredData = data.results?.map((cast) => ({
        id: cast.id,
        title: cast.title,
        subTitle: formateDateString(cast.release_date),
        poster: cast.poster_path,
        vote_avg: cast.vote_average,
      }));
      setAllTrendingMovies(refactoredData);
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
      <Scroller data={allTrendingMovies} category="movie" />
    </section>
  );
};

export default Trending;
