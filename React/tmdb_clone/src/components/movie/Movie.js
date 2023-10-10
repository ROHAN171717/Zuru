import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import SelectMenu from "../selectMenu/SelectMenu";
import Accordion from "../accordion/Accordion";
import { getAllCountry, getWatchProvider } from "../api/api";
import WatchProvider from "../watchProvider/WatchProvider";

const Movie = () => {
  const { id } = useParams();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isWhereToWatchOpen, setIsWhereToWatchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [region, setRegion] = React.useState("AD");
  const [watchProviderData, setWatchProviderData] = useState([]);
  console.log(region);

  const items = [
    { name: "Popularity Descending", value: "pd" },
    { name: "Popularity Ascending", value: "pa" },
    { name: "Rating Descending", value: "rd" },
    { name: "Rating Ascending", value: "ra" },
    { name: "Release Date Descending", value: "rdd" },
    { name: "Release Date Ascending", value: "rda" },
    { name: "Title (A-Z)", value: "az" },
    { name: "Title (Z-A)", value: "za" },
  ];

  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    async function getData() {
      const data = await getAllCountry();
      setCountryData(data);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const data = await getWatchProvider(region);
      setWatchProviderData(data.results);
    }
    getData();
  }, [region]);

  return (
    <div className="movie_content_wrapper">
      <div className="movie_content">
        <div className="title">
          <h2>Popular Movies</h2>
        </div>
        <div className="movie_detail">
          <div className="movie_detail_left">
            <Accordion
              title="Sort"
              isOpen={isSortOpen}
              setIsOpen={setIsSortOpen}
            >
              <div className="filter">
                <h3>Sort Results By</h3>
                <SelectMenu items={items} title="order" />
              </div>
            </Accordion>

            <Accordion
              title="Where To Watch"
              digit={55}
              isOpen={isWhereToWatchOpen}
              setIsOpen={setIsWhereToWatchOpen}
            >
              <div className="filter">
                <h3>
                  My Services <span className="question_icon"></span>
                </h3>
                <label className="checkbox_wrraper">
                  <input
                    type="checkbox"
                    id="my_services"
                    className="service_checkbox"
                    disabled
                  />
                  <label for="my_services" className="service_desc">
                    Restrict searches to my subscribed services?
                  </label>
                </label>
              </div>

              <div className="filter">
                <h3>Country</h3>
                <SelectMenu
                  items={countryData}
                  title="country"
                  menuWidth={300}
                  region={region}
                  setRegion={setRegion}
                />
                <WatchProvider data={watchProviderData} />
              </div>
            </Accordion>

            <Accordion
              title="Filters"
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
            >
              <div
                className="filter"
                style={{ display: isFilterOpen ? "flex" : "none" }}
              >
                <h3>Sort Results By</h3>
              </div>
            </Accordion>

            <div>
              <button className="search_btn">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
