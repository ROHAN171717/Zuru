import React, { useEffect, useRef, useState } from "react";
import Accordion from "../../../../components/accordion/Accordion";
import SelectMenu from "../selectMenu/SelectMenu";
import WatchProvider from "../../../../components/watchProvider/WatchProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterList from "../filterList/FilterList";
import RangeSlider from "../rangeSlider/RangeSlider";
import {
  getAllCountry,
  getKeywords,
  getLanguages,
  getMovieGenres,
  getWatchProvider,
} from "../../../../components/api/api";
import Popper from "../../../../components/popper/Popper";
import CheckboxWrapper from "../checkboxWrapper/CheckboxWrapper";
import removeIcon from "../../../../Images/remove_icon.png";
import {
  ALL_SORTING_ORDER,
  AVAILABILITIES,
  RELEASE_TYPE,
} from "../../../../constant";

let timeout;

const LeftPanel = ({ setMovieData }) => {
  const initialMovieFilter = {
    selectedSortingOrder: ALL_SORTING_ORDER[0],
    selectedWatchRegion: "",
    selectedLanguage: "",
    selectedWatchProviders: [],
    isSearchAllAvailabilities: true,
    selectedAvailabilities: AVAILABILITIES,
    isSearchAllReleases: true,
    selectedReleases: RELEASE_TYPE,
    releaseFrom: "",
    releaseTo: "",
    userScore: [0, 10],
    userVotes: 0,
    runtime: [0, 360],
    searchString: "",
    selectedKeywords: [],
    selectedMovieGenres: [],
    selectedCertification: [],
  };

  const demo = { ...initialMovieFilter };
  const popperRef = useRef();

  const [referenceElement, setReferenceElement] = useState();

  const [movieFilter, setMovieFilter] = useState(
    JSON.parse(JSON.stringify(initialMovieFilter))
  );

  const [APIData, setAPIData] = useState({
    countryData: [],
    filteredData: [],
    languages: [],
    watchProviderData: [],
    movieGenres: [],
    keywordResult: [],
  });

  // console.log(
  //   JSON.stringify(initialMovieFilter) === JSON.stringify(movieFilter)
  // );

  const keysArr = Object.keys(initialMovieFilter);
  let isMovieFilterChanged = keysArr.some((key) => {
    if (typeof initialMovieFilter[key] === "object") {
      if (Array.isArray(initialMovieFilter[key])) {
        let isNotFound = false;
        initialMovieFilter[key]?.forEach((item) => {
          if (!movieFilter[key].includes(item)) {
            isNotFound = true;
          }
        });
        return isNotFound;
      } else {
        let isNotFound = false;
        initialMovieFilter[key].keys?.forEach((x) => {
          if (initialMovieFilter[key][x] !== movieFilter[key][x]) {
            isNotFound = true;
          }
        });
        return isNotFound;
      }
    } else {
      return initialMovieFilter[key] !== movieFilter[key];
    }
  });

  useEffect(() => {
    async function getData() {
      const data = await getWatchProvider(
        movieFilter.selectedWatchRegion?.iso_3166_1
      );
      setAPIData({ ...APIData, watchProviderData: data.results });
    }
    getData();
  }, [movieFilter.selectedWatchRegion]);

  useEffect(() => {
    async function getData() {
      const data = await getAllCountry();
      const languagesData = await getLanguages();
      const movieGenresData = await getMovieGenres();

      const refactoredCountryData = data.map((country) => ({
        name: country.english_name,
        id: country.iso_3166_1,
      }));

      const refactoredLanguagesData = languagesData.map((language) => ({
        name: language.english_name,
        id: language.iso_639_1,
      }));

      console.log("refactoredLanguagesData", refactoredLanguagesData);

      const refactoredMovieGenresData = movieGenresData.genres.map(
        (movieGenres) => ({
          name: movieGenres.name,
          id: movieGenres.id,
        })
      );

      setAPIData({
        ...APIData,
        countryData: refactoredCountryData,
        filteredData: refactoredCountryData,
        languages: refactoredLanguagesData,
        movieGenres: refactoredMovieGenresData,
      });
    }
    getData();
  }, []);

  function handleMovieFilterChange(key, value) {
    setMovieFilter({ ...movieFilter, [key]: value });
  }

  function handleFilter(value) {
    const newArr = APIData.countryData.filter(
      (item) =>
        item.english_name
          .toLowerCase()
          .replace(" ", "")
          .indexOf(value.toLowerCase().replace(" ", "")) > -1
    );
    setAPIData({ ...APIData, filteredData: newArr });
  }

  function handleKeywordChange(e) {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const data = await getKeywords(e.target.value);
      const newArr = data.results.filter(
        (item) => !movieFilter.selectedKeywords.includes(item.name)
      );
      setAPIData({ ...APIData, keywordResult: newArr });
    }, 1000);
  }

  function removeSelectedKeywords(value) {
    const newArr = movieFilter.selectedKeywords.filter(
      (item) => item !== value
    );
    // setSelectedkeywords(newArr);
    setMovieFilter({ ...movieFilter, selectedKeywords: newArr });
  }

  return (
    <div className="movie_detail_left">
      <Accordion title="Sort" isAccordianOpen={false}>
        <div className="filter">
          <h3>Sort Results By</h3>
          <SelectMenu
            items={ALL_SORTING_ORDER}
            title="order"
            selectedValue={movieFilter.selectedSortingOrder?.id}
            changeSelectedValue={(value) =>
              handleMovieFilterChange("selectedSortingOrder", value)
            }
          />
        </div>
      </Accordion>

      <Accordion title="Where To Watch" digit={55} isAccordianOpen={false}>
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
            items={APIData.filteredData}
            title="country"
            menuWidth={300}
            handleFilter={handleFilter}
            selectedValue={
              movieFilter.selectedWatchRegion?.id || APIData.filteredData[0]?.id
            }
            changeSelectedValue={(value) =>
              handleMovieFilterChange("selectedWatchRegion", value)
            }
          />
          <WatchProvider
            data={APIData.watchProviderData}
            selectedItems={movieFilter.selectedWatchProviders}
            setSelectedItems={(value) =>
              handleMovieFilterChange("selectedWatchProviders", value)
            }
          />
        </div>
      </Accordion>

      <Accordion title="Filters" isAccordianOpen={true}>
        <div className="filter">
          <h3>
            Show Me <span className="question_icon"></span>
          </h3>
          <div className="show_me_wrapper">
            <div className="show_me">
              <input
                type="radio"
                className="show_me_radioButton"
                id="show_me"
                checked
              />
              <label for="show_me" className="show_me_desc">
                Everything
              </label>
            </div>
            <div className="show_me">
              <input
                type="radio"
                className="show_me_radioButton"
                id="show_me"
                disabled
              />
              <label for="show_me" className="show_me_desc">
                Movies | Haven't Seen
              </label>
            </div>
            <div className="show_me">
              <input
                type="radio"
                className="show_me_radioButton"
                id="show_me"
                disabled
              />
              <label for="show_me" className="show_me_desc">
                Movies | Have Seen
              </label>
            </div>
          </div>
        </div>

        <div className="filter">
          <h3>Availabilities</h3>
          <div className="availability_wrapper">
            <div className="availability">
              <input
                type="checkbox"
                id="availability"
                className="availability_checkbox search_all"
                onChange={(e) => {
                  e.stopPropagation();
                  setMovieFilter({
                    ...movieFilter,
                    isSearchAllAvailabilities: e.target.checked,
                  });
                }}
                checked={movieFilter.isSearchAllAvailabilities}
              />
              <label for="availability" className="availability_desc">
                Search all availabilities?
              </label>
            </div>
            <div
              style={{
                display: movieFilter.isSearchAllAvailabilities ? "none" : "",
              }}
            >
              <CheckboxWrapper
                items={AVAILABILITIES}
                selectedItems={movieFilter.selectedAvailabilities}
                setSelectedItems={(value) =>
                  handleMovieFilterChange("selectedAvailabilities", value)
                }
              />
            </div>
          </div>
        </div>

        <div className="filter">
          <h3>Release Dates</h3>
          <div className="release_date_wrapper">
            <div className="date_checkbox_wrapper">
              <div className="availability">
                <input
                  type="checkbox"
                  id="availability"
                  className="availability_checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMovieFilter({
                      ...movieFilter,
                      isSearchAllReleases: e.target.checked,
                    });
                  }}
                  checked={movieFilter.isSearchAllReleases}
                />
                <label for="availability" className="availability_desc">
                  Search all release?
                </label>
              </div>

              <div
                style={{
                  display: movieFilter.isSearchAllReleases ? "none" : "",
                }}
              >
                <CheckboxWrapper
                  items={RELEASE_TYPE}
                  selectedItems={movieFilter.selectedReleases}
                  setSelectedItems={(value) =>
                    handleMovieFilterChange("selectedReleases", value)
                  }
                />
              </div>

              <div className="date_picker">
                <div className="date_select">
                  <p>from</p>
                  {movieFilter.releaseFrom}
                  <span>
                    <DatePicker
                      selected={movieFilter.releaseFrom}
                      onChange={(date) => {
                        setMovieFilter({ ...movieFilter, releaseFrom: date });
                      }}
                    />
                  </span>
                </div>
                <div className="date_select">
                  <p>to</p>
                  <span>
                    <DatePicker
                      selected={
                        movieFilter.releaseTo ||
                        new Date(new Date().setMonth(new Date().getMonth() + 6))
                      }
                      onChange={(date) => {
                        setMovieFilter({ ...movieFilter, releaseTo: date });
                      }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="filter">
          <h3>Genres</h3>
          <FilterList
            items={APIData.movieGenres}
            selectedItems={movieFilter.selectedMovieGenres}
            setSelectedItems={(value) =>
              handleMovieFilterChange("selectedMovieGenres", value)
            }
          />
        </div>

        <div className="filter">
          <h3>Certification</h3>
          <FilterList
            items={["U", "UA", "A"]}
            selectedItems={movieFilter.selectedCertification}
            setSelectedItems={(value) =>
              handleMovieFilterChange("selectedCertification", value)
            }
          />
        </div>

        <div className="filter">
          <h3>
            Language <span className="question_icon"></span>
          </h3>
          <SelectMenu
            items={APIData.languages}
            title="language"
            selectedValue={
              movieFilter?.selectedLanguage?.id || APIData.languages[0]?.id
            }
            changeSelectedValue={(value) =>
              handleMovieFilterChange("selectedLanguage", value)
            }
          />
        </div>

        <div className="filter">
          <h3>User Score</h3>
          <RangeSlider
            type="user_score"
            values={{
              val: movieFilter.userScore,
              setValue: (value) => handleMovieFilterChange("userScore", value),
              min: 0,
              max: 10,
              step: 1,
              marks: [
                {
                  value: 0,
                  label: "0",
                },
                {
                  value: 5,
                  label: "5",
                },
                {
                  value: 10,
                  label: "10",
                },
              ],
              valueLabelFormate: (value) => `Rated ${value[0]} - ${value[1]}`,
            }}
          />
        </div>

        <div className="filter">
          <h3>Minimum User Votes</h3>
          <RangeSlider
            type="minimum_user_votes"
            values={{
              val: movieFilter.userVotes,
              setValue: (value) => handleMovieFilterChange("userVotes", value),
              min: 0,
              max: 500,
              step: 50,
              marks: [
                {
                  value: 0,
                  label: "0",
                },
                {
                  value: 100,
                  label: "100",
                },
                {
                  value: 200,
                  label: "200",
                },
                {
                  value: 300,
                  label: "300",
                },
                {
                  value: 400,
                  label: "400",
                },
                {
                  value: 500,
                  label: "500",
                },
              ],
              valueLabelFormate: (value) => value,
            }}
          />
        </div>

        <div className="filter">
          <h3>Runtime</h3>
          <RangeSlider
            type="runtime"
            values={{
              val: movieFilter.runtime,
              setValue: (value) => handleMovieFilterChange("runtime", value),
              min: 0,
              max: 360,
              step: 15,
              marks: [
                {
                  value: 0,
                  label: "0",
                },
                {
                  value: 120,
                  label: "120",
                },
                {
                  value: 240,
                  label: "240",
                },
                {
                  value: 360,
                  label: "360",
                },
              ],
              valueLabelFormate: (value) =>
                `${value[0]} minutes - ${value[1]} minutes`,
            }}
          />
        </div>

        <div className="filter">
          <h3>Keywords</h3>
          <div className="filter_by_keywords" ref={setReferenceElement}>
            {movieFilter.selectedKeywords.length > 0 && (
              <ul className="selected_keyword_list">
                {movieFilter.selectedKeywords.map((keyword) => (
                  <span className="selected_keyword">
                    {keyword.name}
                    <img
                      src={removeIcon}
                      alt="remove_icon"
                      onClick={() => removeSelectedKeywords(keyword)}
                    />
                  </span>
                ))}
              </ul>
            )}
            <input
              type="text"
              value={movieFilter.searchString}
              placeholder="Filter by keywords..."
              className="keyword_search"
              onChange={(e) => {
                setMovieFilter({
                  ...movieFilter,
                  searchString: e.target.value,
                });
                handleKeywordChange(e);
              }}
              ref={setReferenceElement}
            />
          </div>
          <Popper
            referenceElement={referenceElement}
            isSelectMenuOpen={
              APIData.keywordResult.length || movieFilter.searchString !== ""
            }
            ref={popperRef}
          >
            {APIData.keywordResult.length !== 0 ? (
              <ul className="select_menu_items">
                {APIData.keywordResult.map((item) => {
                  return (
                    <li
                      className={`select_menu_item`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMovieFilter({
                          ...movieFilter,
                          selectedKeywords: [
                            ...movieFilter.selectedKeywords,
                            item,
                          ],
                          searchString: "",
                        });
                        setAPIData({ ...APIData, keywordResult: [] });
                        popperRef.current.update();
                      }}
                      key={item.id}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="no_data_wrapper">
                <p>No Data Found</p>
              </div>
            )}
          </Popper>
        </div>
      </Accordion>

      <div>
        <button className="search_btn" disabled={!isMovieFilterChanged}>
          Search
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
