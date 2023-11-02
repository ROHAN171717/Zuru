import React, { useEffect, useRef, useState } from "react";
import { getVideosById } from "../../../../components/api/api";
import { useParams } from "react-router-dom";
import Popper from "../../../../components/popper/Popper";
import remove_icon from "../../../../Images/remove_icon.png";
import "./trailerModel.css";

const TrailerModel = ({ setIsOpen }) => {
  const [trailer, setTrailer] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function getData() {
      const data = await getVideosById(params.category, params.id);
      console.log("data", data.results);

      const trailerData = data.results?.filter((item) => {
        // console.log(item.name, item.name.includes("Official Trailer"));
        return item.name.includes("Official Trailer");
      });
      setTrailer(trailerData);
    }
    getData();
  }, []);
  console.log("Data:- ", trailer?.[0]?.key);

  return (
    <div className="trailer_model">
      <div className="trailer_model_action">
        <h2>Play Trailer</h2>
        <div className="img_wrapper" onClick={() => setIsOpen(false)}>
          <img
            src={remove_icon}
            alt="close_icon"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${trailer?.[0]?.key}`}
        title="YouTube video player"
        style={{ margin: "0 auto" }}
      ></iframe>
    </div>
  );
};

export default TrailerModel;
