import React, { useEffect, useState } from 'react';
import './rightPanel.css';
import { useParams } from 'react-router-dom';
import { getKeywordsById } from '../../../../components/api/api';

function RightPanel({ movieDetail }) {
  const params = useParams();
  const [keywords, setKeywords] = useState([]);
  function getOriginalLanguage(originalLanguage) {
    const selectedLanguage = movieDetail?.spoken_languages?.find(
      (language) => language.iso_639_1 === originalLanguage,
    );
    return selectedLanguage?.english_name;
  }

  useEffect(() => {
    async function getData(category, id) {
      const data = await getKeywordsById(category, id);
      setKeywords(data.keywords || data.results);
    }
    getData(params.category, params.id);
  }, [params.category, params.id]);

  return (
    <div className="rightPanel">
      <div className="info_wrapper">
        {(movieDetail.name !== movieDetail.original_name
          || movieDetail.title !== movieDetail.original_title) && (
          <p className="info">
            <strong>
              Original
              {' '}
              {movieDetail.title !== undefined ? 'Title' : 'Name'}
            </strong>
            {movieDetail.original_title || movieDetail.original_name}
          </p>
        )}
        <p className="info">
          <strong>Status</strong>
          {movieDetail.status}
        </p>
        {params.category === 'tv' && (
          <>
            <p className="info">
              <strong>Network</strong>
              <img
                src={`https://www.themoviedb.org/t/p/h30/${movieDetail?.networks?.[0]?.logo_path}`}
                alt="network_provider"
              />
            </p>
            <p className="info">
              <strong>Type</strong>
              {movieDetail?.type}
            </p>
          </>
        )}
        <p className="info">
          <strong>Original Language</strong>
          {getOriginalLanguage(movieDetail.original_language)}
        </p>
        {params.category === 'movie' && (
          <>
            <p className="info">
              <strong>Budget</strong>
              {movieDetail?.budget === 0 ? (
                <> - </>
              ) : (
                <>
                  $
                  {movieDetail?.budget?.toLocaleString()}
                </>
              )}
            </p>
            <p className="info">
              <strong>Revenue</strong>
              {movieDetail?.revenue === 0 ? (
                <> - </>
              ) : (
                <>
                  $
                  {movieDetail?.revenue?.toLocaleString()}
                </>
              )}
            </p>
          </>
        )}
      </div>
      <div className="keywords_wrapper">
        <h4>Keywords</h4>
        <ul className="keywords_list">
          {keywords?.map((keyword) => (
            <li className="keyword">{keyword.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RightPanel;
