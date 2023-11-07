import React from 'react';
import './recommendation.css';
import { useParams } from 'react-router-dom';
import { dateFormatter } from '../../helper';

function RecommendationCard({ data }) {
  const params = useParams();
  return (
    <div className="recommendation">
      <div
        className={`recommendation_poster ${
          data.backdrop_path === null ? 'no_img' : ''
        }`}
      >
        <img
          src={
            data.backdrop_path !== null
              ? `https://www.themoviedb.org/t/p/w250_and_h141_face/${data.backdrop_path}`
              : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
          }
          alt={data.title || data.name}
          className={`${data.backdrop_path === null ? 'no_img' : 'image'}`}
        />
      </div>
      <div className="recommendation_detail">
        <p style={{ textAlign: 'left' }}>{data.title || data.name}</p>
        <p>
          {Math.round(data.vote_average * 10)}
          %
        </p>
      </div>
      <div className="release_date">
        <img
          src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-46-calendar-3e0931dfeba8f62c51e81dfa4364a6d836f3a03aaf739a51d0846902ee367645.svg"
          alt="calendar"
        />
        <span>
          {dateFormatter(
            params.category === 'movie'
              ? new Date(data?.release_date)
              : new Date(data?.first_air_date),
          )}
        </span>
      </div>
    </div>
  );
}

export default RecommendationCard;
