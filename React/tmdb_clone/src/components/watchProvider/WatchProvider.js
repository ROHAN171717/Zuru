import React from "react";
import "./watchProvider.css";

const WatchProvider = ({ data }) => {
  console.log(data);

  return (
    <div className="ott_wrapper">
      {data?.map((item) => (
        <li className="ott_item">
          <img className="item_logo"
            src={`https://www.themoviedb.org/t/p/original/${item.logo_path}`}
          />
          <div className="tooltip_img_wrapper">
                  <span className="tooltip_img" style={{
                      backgroundImage: 'url(https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-739-check-white-a09b2a26e235b77489dfd57be3b66a17ff86efd5fb94d6db5f10cd3ced01e5a6.svg)',
                      width: '30px',
                      height: '30px',
            }}></span>
          </div>
        </li>
      ))}
    </div>
  );
};

export default WatchProvider;
