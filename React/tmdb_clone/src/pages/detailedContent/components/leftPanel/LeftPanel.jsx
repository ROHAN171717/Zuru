import React, { useEffect, useState } from 'react';
import './leftPanel.css';
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import {
  getCastData,
  getRecommendations,
  getReviews,
} from '../../../../components/api/api';
import Scroller from '../../../../components/scroller/Scroller';
import { formateDateString } from '../../../../helper';

function LeftPanel({ movieDetail }) {
  const params = useParams();
  const [allCast, setAllCast] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [review, setReview] = useState({});
  const [allRecommendations, setAllRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getModifiedReview(content) {
    return content?.split(' ').length > 150
      ? `${content?.split(' ').slice(0, 150).toString().replaceAll(',', ' ')
      }...`
      : content;
  }
  getModifiedReview();

  useEffect(() => {
    async function getData(category, id) {
      setIsLoading(true);
      const data = await getCastData(category, id);
      const refactoredCastData = data?.cast?.map((cast) => ({
        id: cast.id,
        title: cast.name,
        subTitle: cast.character,
        poster: cast.profile_path,
      }));
      const getReviewdata = await getReviews(category, id);

      const getRecommendationsData = await getRecommendations(category, id);

      setAllCast(refactoredCastData);
      setAllReviews(getReviewdata.results);
      setReview(getReviewdata.results[0]);
      setAllRecommendations(getRecommendationsData.results);
      setIsLoading(false);
    }
    getData(params.category, params.id);
  }, [params.category, params.id]);

  return (
    <div className="leftPanel">
      <div className="cast_wrapper">
        <h3 className="title">
          {params.category === 'movie' ? 'Top Billed Cast' : 'Series Cast'}
        </h3>
        <Scroller
          data={allCast}
          variant="medium"
          movieCardVariant="small"
          isLoading={isLoading}
        />
      </div>
      {params.category === 'tv' && (
        <div className="current_season_wrapper">
          <h3 className="title">Current Season</h3>
          <div className="season_card">
            <img
              src={
                movieDetail?.seasons?.[movieDetail.seasons.length - 1]
                  .poster_path !== null
                  ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${
                    movieDetail?.seasons?.[movieDetail.seasons.length - 1]
                      .poster_path
                  }`
                  : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
              }
              className={`season_poster ${
                movieDetail?.seasons?.[movieDetail.seasons.length - 1]
                  .poster_path === null
                  ? 'no_img'
                  : ''
              }`}
              alt=""
            />
            <div className="content">
              <div className="season_header">
                <h2>
                  {movieDetail?.seasons?.[movieDetail.seasons.length - 1].name}
                </h2>
                <h4>
                  {new Date(
                    movieDetail?.seasons?.[
                      movieDetail.seasons.length - 1
                    ].air_date,
                  ).getFullYear()}
                  {' '}
                  •
                  {' '}
                  {
                    movieDetail?.seasons?.[movieDetail.seasons.length - 1]
                      .episode_count
                  }
                  {' '}
                  Episodes
                </h4>
              </div>
              <div className="season_overview">
                <p>
                  {movieDetail?.seasons?.[movieDetail.seasons.length - 1].name}
                  {' '}
                  of
                  {' '}
                  {movieDetail.name}
                  {' '}
                  premiered on
                  {' '}
                  {formateDateString(
                    movieDetail?.seasons?.[movieDetail.seasons.length - 1]
                      .air_date,
                  )}
                  .
                </p>
              </div>
              <div className="chapter_wrapper">
                <p className="chapter">
                  <img
                    src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-46-calendar-3e0931dfeba8f62c51e81dfa4364a6d836f3a03aaf739a51d0846902ee367645.svg"
                    alt="calendar_icon"
                  />
                  <span style={{ borderBottom: '1px solid black' }}>
                    {movieDetail?.next_episode_to_air?.name}
                  </span>
                </p>
                <span className="date">
                  (
                  {movieDetail?.next_episode_to_air?.season_number}
                  x
                  {movieDetail?.next_episode_to_air?.episode_number}
                  ,
                  {' '}
                  {formateDateString(
                    movieDetail?.next_episode_to_air?.air_date,
                  )}
                  )
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="social_panel_wrapper">
        <div className="menu">
          <h3 className="title">Social</h3>
          <div>
            <p className="menu_item">
              Reviews
              {' '}
              <span className="review_count">{allReviews?.length}</span>
            </p>
          </div>
        </div>
        {allReviews?.length > 0 ? (
          <div className="content">
            <div className="review_header">
              <div className="avatar">
                <Avatar
                  src={`https://www.themoviedb.org/t/p/w45_and_h45_face${review?.author_details.avatar_path}`}
                />
              </div>
              <div className="info">
                <h3>
                  A review by
                  {review?.author}
                </h3>
                <div className="rating_wrapper">
                  <div className="rating">
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-49-star-67a24f6d4324aa644c594653e762b1c0de2b3e1ce0852171cfa49cc2650de374.svg"
                      alt="star_icon"
                    />
                    <p>6.0</p>
                  </div>
                  <h5>
                    Written by
                    {' '}
                    <span className="name">{review?.author}</span>
                    {' '}
                    on
                    {formateDateString(review?.created_at)}
                  </h5>
                </div>
              </div>
            </div>
            <div className="review_content">
              <p>{getModifiedReview(review?.content)}</p>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'left' }}>
            We don't have any reviews for
            {' '}
            {movieDetail.title || movieDetail.name}
            .
          </p>
        )}
      </div>
      <div className="recommendations_wrapper">
        <h3 className="title">Recommendations</h3>
        {allRecommendations.length > 0 ? (
          <Scroller
            data={allRecommendations}
            variant="medium"
            movieCardVariant="recommendations"
            isLoading={isLoading}
          />
        ) : (
          <p style={{ textAlign: 'left' }}>
            We don't have enough data to suggest any movies based on
            {' '}
            {movieDetail.title || movieDetail.name}
            . You can help by rating
            movies you've seen.
          </p>
        )}
      </div>
    </div>
  );
}

export default LeftPanel;
