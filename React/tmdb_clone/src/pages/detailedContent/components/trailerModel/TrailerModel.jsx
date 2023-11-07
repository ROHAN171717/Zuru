import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideosById } from '../../../../components/api/api';
import removeIcon from '../../../../Images/remove_icon.png';
import './trailerModel.css';

function TrailerModel({ setIsOpen }) {
  const [trailer, setTrailer] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function getData() {
      const data = await getVideosById(params.category, params.id);

      const trailerData = data.results?.filter((item) => item.name.includes('Official Trailer'));
      setTrailer(trailerData);
    }
    getData();
  }, []);

  return (
    <div className="trailer_model">
      <div className="trailer_model_action">
        <h2>Play Trailer</h2>
        <div className="img_wrapper" onClick={() => setIsOpen(false)}>
          <img
            src={removeIcon}
            alt="close_icon"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
      {trailer?.[0]?.key !== null ? (
        <iframe
          src={`https://www.youtube.com/embed/${trailer?.[0]?.key}`}
          title="YouTube video player"
          style={{ margin: '0 auto' }}
        />
      ) : (
        <div className="trailer_not_found">
          <h1>Official Trailer Not Available</h1>
        </div>
      )}
    </div>
  );
}

export default TrailerModel;
