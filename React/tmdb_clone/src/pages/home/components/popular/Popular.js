import React, { useState, useEffect, useRef } from "react";
import "./popular.css";
import { getPopularMovies } from "../../../../components/api/api";
import MovieCard from "../../../../components/movieCard/MovieCard";
import SectionTitle from "../../../../components/sectionTitle/SectionTitle";
import Scroller from "../../../../components/scroller/Scroller";
import { formateDateString } from "../../../../helper";

const arr = [
  { id: 1, name: "Movie", type: "movie", value: "popular" },
  { id: 2, name: "On TV", type: "tv", value: "popular" },
  { id: 3, name: "In Theaters", type: "movie", value: "now_playing" },
];

const Popular = () => {
  const [id, setId] = useState(1);
  const [selectedItem, setSelectedItem] = useState(arr[0].name);
  const [allPopular, setAllPopular] = useState([]);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tvShowOrMovieref = useRef("movie");

  useEffect(() => {
    let category = "popular";

    arr.forEach((item) => {
      if (id === item.id) {
        category = item.value;
        tvShowOrMovieref.current = item.type;
      }
    });

    async function getData() {
      setIsLoading(true);
      const data = await getPopularMovies(category, tvShowOrMovieref.current);
      // getPopularMovies(category, tvShowOrMovie).then((res) => setAllTrendingMovies(res.results));
      const refactoredData = data.results?.map((cast) => ({
        id: cast.id,
        title: cast.title || cast.name,
        subTitle: formateDateString(cast.release_date || cast.first_air_date),
        poster: cast.poster_path,
        vote_avg: cast.vote_average,
      }));
      setAllPopular(refactoredData);
      setIsLoading(false);
    }
    getData();
    setIsCategoryChanged(false);
    setTimeout(() => {
      setIsCategoryChanged(true);
    }, 500);

    const selectedItem2 = arr.find((item) => item.id === id);
    setSelectedItem(selectedItem2.name);
  }, [id]);

  return (
    <section className="inner_content trending popular">
      <SectionTitle
        title="What's Popular"
        items={arr}
        setId={setId}
        id={id}
        selectedItem={selectedItem}
      />
      <Scroller
        data={allPopular}
        category={tvShowOrMovieref.current}
        isCategoryChanged={isCategoryChanged}
        isLoading={isLoading}
        // handleScroll={() => handleScroller(1)}
        number={1}
      />
    </section>
  );
};

export default Popular;
