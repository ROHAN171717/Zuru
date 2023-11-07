import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../../components/sectionTitle/SectionTitle';
import './trending.css';
import { getTrendingMovies } from '../../../../components/api/api';
import Scroller from '../../../../components/scroller/Scroller';
import { formateDateString } from '../../../../helper';

const arr = [
  { id: 1, name: 'Today', value: 'day' },
  { id: 2, name: 'This Week', value: 'week' },
];

function Trending() {
  const [id, setId] = useState(1);
  const [selectedItem, setSelectedItem] = useState(arr[0].name);
  const [allTrendingMovies, setAllTrendingMovies] = useState([]);
  const [isCategoryChanged, setIsCategoryChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let category = 'day';
    arr.forEach((item) => {
      if (id === item.id) {
        category = item.value;
        setSelectedItem(item.name);
      }
    });

    async function getData() {
      setIsLoading(true);
      const data = await getTrendingMovies(category);
      const refactoredData = data.results.map((cast) => ({
        id: cast.id,
        title: cast.title,
        subTitle: formateDateString(cast.release_date),
        poster: cast.poster_path,
        vote_avg: cast.vote_average,
      }));
      setAllTrendingMovies(refactoredData);
      setIsLoading(false);
    }
    getData();
    setIsCategoryChanged(false);
    setTimeout(() => {
      setIsCategoryChanged(true);
    }, 500);
  }, [id]);

  return (
    <section className="inner_content trending">
      <SectionTitle
        title="Trending"
        items={arr}
        setId={setId}
        id={id}
        selectedItem={selectedItem}
      />
      <Scroller
        data={allTrendingMovies}
        category="movie"
        isCategoryChanged={isCategoryChanged}
        isLoading={isLoading}
      />
    </section>
  );
}

export default Trending;
