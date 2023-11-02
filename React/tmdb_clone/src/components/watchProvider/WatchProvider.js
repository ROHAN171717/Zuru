import React from "react";
import "./watchProvider.css";
import toggleItemInArray from "../../helper";

const WatchProvider = ({ data, selectedItems, setSelectedItems }) => {
  
  return (
    <div className="ott_wrapper">
      {data?.map((item) => (
        <li
          className={`ott_item ${
            selectedItems.includes(item) ? "selected" : ""
          }`}
          onClick={() =>
            setSelectedItems(toggleItemInArray(selectedItems, item))
          }
          key={item.id}
        >
          <img
            className="item_logo"
            src={`https://www.themoviedb.org/t/p/original/${item.logo_path}`}
            alt="OTT_logo"
          />
          <div className="tooltip_img_wrapper">
            <span className="tooltip_img"></span>
          </div>
        </li>
      ))}
    </div>
  );
};

export default WatchProvider;
