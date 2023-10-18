import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Accordion from "../../../../components/accordion/Accordion";
import SelectMenu from "../selectMenu/SelectMenu";
import WatchProvider from "../../../../components/watchProvider/WatchProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterList from "../filterList/FilterList";
import RangeSlider from "../rangeSlider/RangeSlider";
import {
  discoverMovies,
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
import { useParams } from "react-router-dom";

let timeout;

const initialCommonMovieFilter = {
  sort_by: ALL_SORTING_ORDER[0],
  watch_region: { name: "India", id: "IN" },
  selectedLanguage: {},
  with_watch_providers: [],
  isSearchAllAvailabilities: true,
  with_watch_monetization_types: AVAILABILITIES,
  isSearchAllReleases: true,
  with_release_type: RELEASE_TYPE,
  isSearchAllCountries: true,
  region: {},
  release_date_gte: "",
  release_date_lte: "",
  vote_average: [0, 10],
  vote_count_gte: 0,
  with_runtime: [0, 400],
  searchString: "",
  with_keywords: [],
  with_genres: [],
  certification: [],
};

const popularMovie = {
  sort_by: ALL_SORTING_ORDER[0],
};

const nowPlayingMovie = {
  isSearchAllReleases: false,
  with_release_type: [RELEASE_TYPE[1]],
  release_date_gte: new Date("9/6/2023"),
};

const upComingMovie = {
  isSearchAllReleases: false,
  with_release_type: [RELEASE_TYPE[1]],
  release_date_gte: new Date("10/18/2023"),
};

const topRatedMovie = {
  sort_by: ALL_SORTING_ORDER[2],
  vote_count_gte: 300,
};

const LeftPanel = forwardRef(
  ({ movieData, setMovieData, setIsFetching }, ref) => {
    const popperRef = useRef();
    const scrollRef = useRef();
    const { category, subCategory } = useParams();

    console.log(category, subCategory);

    const [referenceElement, setReferenceElement] = useState();
    const [initialMovieFilter, setInitialMovieFilter] = useState({
      ...initialCommonMovieFilter,
    });

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
    const initialMovieFilterKeysArr = Object.keys(initialMovieFilter);

    useEffect(() => {
      if (category === "movies" && subCategory === "popular") {
        setInitialMovieFilter({
          ...initialCommonMovieFilter,
          ...popularMovie,
          release_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          ),
        });
        setMovieFilter({
          ...initialCommonMovieFilter,
          ...popularMovie,
          release_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 6)
          ),
        });
      } else if (category === "movies" && subCategory === "now_playing") {
        setInitialMovieFilter({
          ...initialCommonMovieFilter,
          ...nowPlayingMovie,
          release_date_lte: new Date(
            new Date(nowPlayingMovie.release_date_gte).setDate(
              new Date(nowPlayingMovie.release_date_gte).getDate() + 42
            )
          ),
        });
        setMovieFilter({
          ...initialCommonMovieFilter,
          ...nowPlayingMovie,
          release_date_lte: new Date(
            new Date(nowPlayingMovie.release_date_gte).setDate(
              new Date(nowPlayingMovie.release_date_gte).getDate() + 42
            )
          ),
        });
      } else if (category === "movies" && subCategory === "upcoming") {
        setInitialMovieFilter({
          ...initialCommonMovieFilter,
          ...upComingMovie,
          release_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 4)
          ),
        });
        setMovieFilter({
          ...initialCommonMovieFilter,
          ...upComingMovie,
          release_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 4)
          ),
        });
      } else if (category === "movies" && subCategory === "top_rated") {
        setInitialMovieFilter({
          ...initialCommonMovieFilter,
          ...topRatedMovie,
          release_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 3)
          ),
        });
        setMovieFilter({
          ...initialCommonMovieFilter,
          ...topRatedMovie,
          release_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 3)
          ),
        });
      }
    }, [subCategory]);

    useEffect(() => {
      async function getData() {
        const data = await getAllCountry();
        const languagesData = await getLanguages();
        const movieGenresData = await getMovieGenres();
        const watchProvider = await getWatchProvider(
          movieFilter.watch_region.id
        );

        const refactoredCountryData = data.map((country) => ({
          name: country.english_name,
          id: country.iso_3166_1,
        }));

        const refactoredLanguagesData = languagesData.map((language) => ({
          name: language.english_name,
          id: language.iso_639_1,
        }));

        const refactoredMovieGenresData = movieGenresData.genres.map(
          (movieGenres) => ({
            name: movieGenres.name,
            id: movieGenres.id,
          })
        );

        setAPIData({
          ...APIData,
          watchProviderData: watchProvider.results,
          countryData: refactoredCountryData,
          filteredData: refactoredCountryData,
          languages: refactoredLanguagesData,
          movieGenres: refactoredMovieGenresData,
        });
      }
      getData();
    }, []);

    useEffect(() => {
      async function getData() {
        const queryString = generateQueryString();
        const data = await discoverMovies(`${queryString}&page=1`);
        setMovieData([...data.results]);
      }
      getData();
    }, [initialMovieFilter]);

    const generateQueryString = useCallback(() => {
      let queryString = "";

      const keyArr = Object.keys(movieFilter).filter(
        (key) => movieFilter[key] !== true
      );

      keyArr.forEach((key) => {
        if (
          typeof movieFilter[key] === "object" &&
          Object.keys(movieFilter[key]).length !== 0
        ) {
          // Object
          if (Array.isArray(movieFilter[key]) && movieFilter[key].length) {
            // Array
            if (
              (key === "with_watch_monetization_types" &&
                movieFilter.isSearchAllAvailabilities === true) ||
              (key === "with_release_type" &&
                movieFilter.isSearchAllReleases === true)
            ) {
              queryString += "";
            } else if (key === "vote_average") {
              queryString += `&vote_average_gte=${movieFilter[key][0]}`;
              queryString += `&vote_average_lte=${movieFilter[key][1]}`;
            } else if (key === "with_runtime") {
              queryString += `&with_runtime_gte=${movieFilter[key][0]}`;
              queryString += `&with_runtime_lte=${movieFilter[key][1]}`;
            } else if (typeof movieFilter[key][0] === "object") {
              // Array of Object
              queryString += `&${key}=${movieFilter[key]
                .map((item) => item.id)
                .join("%7c")}`;
            } else {
              // Array of String
              queryString += `&${key}=${movieFilter[key].join("%7c")}`;
            }
          } else {
            // Object with Id
            queryString += `&${key}=${movieFilter[key].id}`;
          }
        } else if (
          // Date Object
          Object.prototype.toString.call(movieFilter[key]) === "[object Date]"
        ) {
          queryString += `&${key}=${dateFormatter(movieFilter[key])}`;
        } else if (
          // String
          (typeof movieFilter[key] === "string" &&
            movieFilter[key].length > 0) ||
          typeof movieFilter[key] === "number"
        ) {
          queryString += `&${key}=${movieFilter[key]}`;
        }
      });
      return queryString;
    }, [movieFilter]);

    const applyFilter = useCallback(
      async (page) => {
        setIsFetching(true);
        const queryString = generateQueryString();
        const data = await discoverMovies(`${queryString}&page=${page}`);
        setMovieData([...movieData, ...data.results]);
        setIsFetching(false);
        if (page < 2) {
          setInitialMovieFilter(movieFilter); // to disable search button again
        }
      },
      [movieFilter, movieData, setMovieData, generateQueryString, setIsFetching]
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          applyFilter,
        };
      },
      [applyFilter]
    );

    async function getWatchProviderData(id) {
      const data = await getWatchProvider(id);
      setAPIData({ ...APIData, watchProviderData: data.results });
    }

    function objectCompare(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      const result = keys1.some((key) => {
        if (typeof keys1[key] === "object") {
          if (Array.isArray(keys1[key])) {
            return !arrayCompare(keys1[key], keys2[key]);
          } else {
            return !objectCompare(keys1[key], keys2[key]);
          }
        } else {
          return object1[key] !== object2[key];
        }
      });

      return !result;
    }

    function arrayCompare(array1, array2) {
      if (array1.length !== array2.length) {
        return false;
      } else {
        const isSame = array1.some((i) => {
          if (typeof array1[i] === "object") {
            return !objectCompare(array1[i], array2[i]);
          } else {
            return array1[i] !== array2[i];
          }
        });
        return !isSame;
      }
    }

    function isMovieFilterChanged(arr) {
      return arr.some((key) => {
        if (
          Object.prototype.toString.call(initialMovieFilter[key]) ===
          "[object Date]"
        ) {
          // date object
          return (
            initialMovieFilter[key]?.getDate() !== movieFilter[key]?.getDate()
          );
        } else if (typeof initialMovieFilter[key] === "object") {
          // object
          return !objectCompare(initialMovieFilter[key], movieFilter[key]);
        } else {
          // string
          return initialMovieFilter[key] !== movieFilter[key];
        }
      });
    }

    function handleMovieFilterChange(key, value) {
      setMovieFilter({ ...movieFilter, [key]: value });
    }

    function handleFilter(value) {
      const newArr = APIData.countryData.filter(
        (item) =>
          item.name
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
          (item) => !movieFilter.with_keywords.includes(item.name)
        );
        setAPIData({ ...APIData, keywordResult: newArr });
      }, 1000);
    }

    function removeKeyword(value) {
      const newArr = movieFilter.with_keywords.filter((item) => item !== value);
      setMovieFilter({ ...movieFilter, with_keywords: newArr });
    }

    function dateFormatter(dateObject) {
      let day = dateObject.getDate();
      let month = dateObject.getMonth() + 1;
      let year = dateObject.getFullYear();

      if (day < 10) {
        day = "0" + day;
      }
      if (month < 10) {
        month = "0" + month;
      }
      return `${year}-${month}-${day}`;
    }
    console.log(isMovieFilterChanged(initialMovieFilterKeysArr));
    console.log("inital", initialMovieFilter);
    console.log("movie", movieFilter);

    return (
      <div className="movie_detail_left" ref={scrollRef}>
        <Accordion title="Sort" isAccordianOpen={false}>
          <div className="filter">
            <h3>Sort Results By</h3>
            <SelectMenu
              items={ALL_SORTING_ORDER}
              title="order"
              selectedValue={movieFilter.sort_by?.id}
              changeSelectedValue={(value) =>
                handleMovieFilterChange("sort_by", value)
              }
            />
          </div>
        </Accordion>

        <Accordion
          title="Where To Watch"
          digit={category === "movies" ? 55 : 41}
          isAccordianOpen={false}
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
              items={APIData.filteredData}
              title="country"
              menuWidth={300}
              handleFilter={handleFilter}
              selectedValue={movieFilter.watch_region?.id}
              changeSelectedValue={(value) => {
                handleMovieFilterChange("watch_region", value);
                getWatchProviderData(value.id);
              }}
            />
            <WatchProvider
              data={APIData.watchProviderData}
              selectedItems={movieFilter.with_watch_providers}
              setSelectedItems={(value) =>
                handleMovieFilterChange("with_watch_providers", value)
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
                  className="availability_checkbox"
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

              {!movieFilter.isSearchAllAvailabilities && (
                <CheckboxWrapper
                  items={AVAILABILITIES}
                  selectedItems={movieFilter.with_watch_monetization_types}
                  setSelectedItems={(value) =>
                    handleMovieFilterChange(
                      "with_watch_monetization_types",
                      value
                    )
                  }
                />
              )}
            </div>
          </div>

          {category === "movies" && (
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

                  {!movieFilter.isSearchAllReleases && (
                    <>
                      <div className="availability">
                        <input
                          type="checkbox"
                          id="availability"
                          className="availability_checkbox"
                          onChange={(e) => {
                            e.stopPropagation();
                            setMovieFilter({
                              ...movieFilter,
                              isSearchAllCountries: e.target.checked,
                            });
                          }}
                          checked={movieFilter.isSearchAllCountries}
                        />
                        <label for="availability" className="availability_desc">
                          Search all countries?
                        </label>
                      </div>
                      {!movieFilter.isSearchAllCountries && (
                        <SelectMenu
                          items={APIData.filteredData}
                          title="country"
                          menuWidth={300}
                          handleFilter={handleFilter}
                          selectedValue={
                            movieFilter.region?.id || APIData.filteredData[0].id
                          }
                          changeSelectedValue={(value) => {
                            handleMovieFilterChange("region", value);
                          }}
                        />
                      )}
                      <CheckboxWrapper
                        items={RELEASE_TYPE}
                        selectedItems={movieFilter.with_release_type}
                        setSelectedItems={(value) =>
                          handleMovieFilterChange("with_release_type", value)
                        }
                      />
                    </>
                  )}

                  <div className="date_picker">
                    <div className="date_select">
                      <p>from</p>
                      <span>
                        <DatePicker
                          selected={movieFilter.release_date_gte}
                          onChange={(date) => {
                            setMovieFilter({
                              ...movieFilter,
                              release_date_gte: date,
                            });
                          }}
                        />
                      </span>
                    </div>
                    <div className="date_select">
                      <p>to</p>
                      <span>
                        <DatePicker
                          selected={movieFilter.release_date_lte}
                          onChange={(date) => {
                            setMovieFilter({
                              ...movieFilter,
                              release_date_lte: date,
                            });
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {category === "tv_shows" && (
            <div className="filter">
              <h3>Air Dates</h3>
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
                      Search all episodes?
                    </label>
                  </div>
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
                      Search first air date?
                    </label>
                  </div>

                  <div className="date_picker">
                    <div className="date_select">
                      <p>from</p>
                      <span>
                        <DatePicker
                          selected={movieFilter.release_date_gte}
                          onChange={(date) => {
                            setMovieFilter({
                              ...movieFilter,
                              release_date_gte: date,
                            });
                          }}
                        />
                      </span>
                    </div>
                    <div className="date_select">
                      <p>to</p>
                      <span>
                        <DatePicker
                          selected={movieFilter.release_date_lte}
                          onChange={(date) => {
                            setMovieFilter({
                              ...movieFilter,
                              release_date_lte: date,
                            });
                          }}
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="filter">
            <h3>Genres</h3>
            <FilterList
              items={APIData.movieGenres}
              selectedItems={movieFilter.with_genres}
              setSelectedItems={(value) =>
                handleMovieFilterChange("with_genres", value)
              }
            />
          </div>

          <div className="filter">
            <h3>Certification</h3>
            <FilterList
              items={["U", "UA", "A"]}
              selectedItems={movieFilter.certification}
              setSelectedItems={(value) =>
                handleMovieFilterChange("certification", value)
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
                val: movieFilter.vote_average,
                setValue: (value) =>
                  handleMovieFilterChange("vote_average", value),
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
                val: movieFilter.vote_count_gte,
                setValue: (value) =>
                  handleMovieFilterChange("vote_count_gte", value),
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
                val: movieFilter.with_runtime,
                setValue: (value) =>
                  handleMovieFilterChange("with_runtime", value),
                min: 0,
                max: 400,
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
              {movieFilter.with_keywords.length > 0 && (
                <ul className="selected_keyword_list">
                  {movieFilter.with_keywords.map((keyword) => (
                    <span className="selected_keyword">
                      {keyword.name}
                      <img
                        src={removeIcon}
                        alt="remove_icon"
                        onClick={() => removeKeyword(keyword)}
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
                            with_keywords: [...movieFilter.with_keywords, item],
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
          <button
            className="search_btn"
            disabled={!isMovieFilterChanged(initialMovieFilterKeysArr)}
            onClick={() => applyFilter(1)}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
);

export default LeftPanel;
