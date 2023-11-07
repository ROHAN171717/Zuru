import React, { useEffect, useRef, useState } from 'react';
import './detailedContent.css';
import { useParams } from 'react-router-dom';
import CircularProgressBar from '../../components/circularProgressBar/CircularProgressBar';
import IconToolTip from './components/iconTooltip/IconToolTip';
import LeftPanel from './components/leftPanel/LeftPanel';
import RightPanel from './components/rightPanel/RightPanel';
import { getMovieDetailById } from '../../components/api/api';
import { dateFormatter } from '../../helper';
import TrailerModel from './components/trailerModel/TrailerModel';
import Popper from '../../components/popper/Popper';

function DetailedContent() {
  const [movieDetail, setMovieDetail] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const popperRef = useRef();
  // const [referenceElement, setReferenceElement] = useState();
  let referenceElement;

  useEffect(() => {
    async function getData(category, id) {
      const data = await getMovieDetailById(category, id);
      setMovieDetail(data);
    }
    getData(params.category, params.id);
  }, [params.category, params.id]);

  function formateRuntime(timeInMinute) {
    let givenTime = timeInMinute;
    let hour = 0;
    let min;

    while (givenTime > 60) {
      hour += 1;
      min = givenTime - 60;
      givenTime = min;
    }
    return `${hour}h ${min}m`;
  }

  return (
    <div className="movie_detail">
      <div
        className="movie_header_wrapper"
        style={{
          backgroundImage: `url(
            https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieDetail?.backdrop_path}
              )`,
        }}
      >
        <div className="background_gradiant">
          <div className="movie_header wrapper">
            <div
              style={{
                backgroundImage: `url(
                  https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieDetail?.backdrop_path}
                    )`,
              }}
              className="movie_poster_bg"
            >
              <div className="movie_poster_bg_gradiant">
                <div
                  className={`movie_poster_wrapper ${
                    movieDetail?.poster_path === undefined || null
                      ? 'no_img'
                      : ''
                  }`}
                  // ref={setReferenceElement}
                >
                  <img
                    src={
                      movieDetail?.poster_path !== undefined || null
                        ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetail?.poster_path}`
                        : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
                    }
                    className="movie_poster"
                    alt="movie_poster"
                  />
                </div>
              </div>
            </div>
            <div className="movie_header_detail">
              <div className="header_title">
                <h2>
                  {movieDetail.title || movieDetail.name}
                  <span className="release_date">
                    (
                    {new Date(
                      movieDetail.release_date || movieDetail.first_air_date,
                    ).getFullYear()}
                    )
                  </span>
                </h2>
                <div className="facts">
                  <span className="certification">R</span>
                  {params.category === 'movie' && (
                    <span className="release">
                      {dateFormatter(new Date(movieDetail.release_date))}
                      {' '}
                      (US)
                    </span>
                  )}
                  <span className="genres">
                    {movieDetail?.genres?.map((item, index) => (
                      <>
                        <a href="/xyz">{item.name}</a>
                        {index !== movieDetail?.genres.length - 1 && (
                          <>,&nbsp;</>
                        )}
                      </>
                    ))}
                  </span>
                  {params.category === 'movie' && (
                    <span className="runtime">
                      {formateRuntime(movieDetail.runtime)}
                    </span>
                  )}
                </div>
              </div>
              <div className="action">
                <div className="chart">
                  <CircularProgressBar
                    percentage={Math.round(movieDetail.vote_average * 10)}
                    variant="full"
                  />
                  <div className="chart_title">
                    User
                    <br />
                    Score
                  </div>
                </div>
                <div className="tooltip">
                  <IconToolTip
                    title="Login to create and edit custom lists"
                    icon="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-159-thumbnails-list-white-c260ea972eebf812289fd3c41d0d2c1dff33ecbcd62be13fba8eeaf9de173789.svg"
                  />
                  <IconToolTip
                    title="Login to add this movie to your favorite list"
                    icon="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-13-heart-white-28d2cc2d6418c5047efcfd2438bfc5d109192671263c270993c05f130cc4584e.svg"
                  />
                  <IconToolTip
                    title="Login to add this movie to your watchlist"
                    icon="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-73-bookmark-white-432e98d550b7e4c80b06272c49475b0db85a60f6fae450420713004b3c9d3ffd.svg"
                  />
                  <IconToolTip
                    title="Login to rate this movie"
                    icon="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-49-star-white-5c85220678b312aea9599d5f12ad858a9e7df226de51ef8b6b699023ffeda5fa.svg"
                  />
                </div>
                {params.category === 'movie' && (
                  <button
                    type="button"
                    className="play_btn"
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    <img
                      src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-175-play-806cb05551791b8dedd7f8d38fd3bd806e2d397fcfeaa00a5cc9129f0819fd07.svg"
                      alt="Play_Trailer"
                    />
                    Play Trailer
                  </button>
                )}
              </div>
              {isOpen === true && (
                <Popper
                  referenceElement={referenceElement}
                  isSelectMenuOpen
                  ref={popperRef}
                  className="popperTrailer"
                >
                  <TrailerModel setIsOpen={setIsOpen} />
                </Popper>
              )}
              <div className="header_info">
                <h3 className="tagline">{movieDetail?.tagline}</h3>
                <h3 className="overview_title">Overview</h3>
                <div className="overview">
                  {movieDetail?.overview !== '' ? (
                    <>{movieDetail.overview}</>
                  ) : (
                    <>
                      We don't have an overview translated in English. Help us
                      expand our database by adding one.
                    </>
                  )}
                </div>
                {params.category === 'tv' && (
                  <div className="people">
                    {movieDetail?.created_by?.map((person) => (
                      <div className="profile">
                        <p className="name">{person.name}</p>
                        <p className="character">Creator</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <LeftPanel movieDetail={movieDetail} />
        <RightPanel movieDetail={movieDetail} />
      </div>
    </div>
  );
}

export default DetailedContent;
