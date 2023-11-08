import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './leftPanel.css';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import Accordion from '../../../../components/accordion/Accordion';
import SelectMenu from '../../../../components/selectMenu/SelectMenu';
import WatchProvider from '../../../../components/watchProvider/WatchProvider';
import 'react-datepicker/dist/react-datepicker.css';
import FilterList from '../filterList/FilterList';
import RangeSlider from '../rangeSlider/RangeSlider';
import {
  discoverMovies,
  getAllCountry,
  getKeywords,
  getLanguages,
  getMovieGenres,
  getWatchProvider,
} from '../../../../components/api/api';
import Popper from '../../../../components/popper/Popper';
import CheckboxWrapper from '../checkboxWrapper/CheckboxWrapper';
import removeIcon from '../../../../Images/remove_icon.png';
import {
  ALL_SORTING_ORDER,
  AVAILABILITIES,
  RELEASE_TYPE,
} from '../../../../constant';

let timeout;

const initialCommonFilter = {
  sort_by: ALL_SORTING_ORDER[0],
  watch_region: { name: 'India', id: 'IN' },
  selectedLanguage: {},
  with_watch_providers: [],
  isSearchAllAvailabilities: true,
  with_watch_monetization_types: AVAILABILITIES,
  region: { name: 'India', id: 'IN' },
  vote_average: [0, 10],
  vote_count_gte: 0,
  with_runtime: [0, 400],
  with_keywords: [],
  with_genres: [],
  certification: [],
};

const initialCommonMovieFilter = {
  isSearchAllReleases: true,
  with_release_type: RELEASE_TYPE,
  isSearchAllCountries: true,
  release_date_gte: '',
  release_date_lte: '',
};

const initialCommonTVShowFilter = {
  isSearchAllEpisodes: true,
  isSearchFirstAirDate: true,
  air_date_gte: '',
  air_date_lte: '',
  first_air_date_lte: '',
  first_air_date_gte: '',
};

const popularMovie = {
  sort_by: ALL_SORTING_ORDER[0],
};

const nowPlayingMovie = {
  isSearchAllReleases: false,
  with_release_type: [RELEASE_TYPE[1]],
};

const upComingMovie = {
  isSearchAllReleases: false,
  with_release_type: [RELEASE_TYPE[1]],
};

const topRatedMovie = {
  sort_by: ALL_SORTING_ORDER[2],
  vote_count_gte: 300,
};

const popularTVShow = {
  isSearchAllAvailabilities: false,
};
const airingTodayTVShow = {
  isSearchAllAvailabilities: false,
};
const nowPlayingTVShow = {
  isSearchAllAvailabilities: false,
};
const topRatedTVShow = {
  vote_count_gte: 200,
};

const LeftPanel = forwardRef(
  ({ movieData, setMovieData, setIsFetching }, ref) => {
    const popperRef = useRef();
    const infiniteScrollRef = useRef();

    const { category, subCategory } = useParams();

    const [referenceElement, setReferenceElement] = useState();
    const [genres, setgenres] = useState([]);
    const [isSearchSelectMenuOpen, setIsSearchSelectMenuOpen] = useState(false);
    const [initialMovieFilter, setInitialMovieFilter] = useState({
      ...initialCommonFilter,
    });
    const [movieFilter, setMovieFilter] = useState(
      JSON.parse(JSON.stringify(initialMovieFilter)),
    );
    const [keywordSearchString, setKeywordSearchString] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [APIData, setAPIData] = useState({
      countryData: [],
      languages: [],
      watchProviderData: [],
      keywordResult: [],
    });

    const filterRef = useRef(initialMovieFilter);
    const initialMovieFilterKeysArr = Object.keys(initialMovieFilter);

    function dateFormatter(dateObject) {
      let day = dateObject.getDate();
      let month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();

      if (day < 10) {
        day = `0${day}`;
      }
      if (month < 10) {
        month = `0${month}`;
      }
      return `${year}-${month}-${day}`;
    }

    const generateQueryString = useCallback((obj) => {
      let queryString = '';

      const keyArr = Object.keys(obj).filter((key) => obj[key] !== true);

      keyArr.forEach((key) => {
        if (
          typeof obj[key] === 'object'
          && obj[key] !== null
          && Object.keys(obj[key]).length !== 0
        ) {
          // Object
          if (Array.isArray(obj[key]) && obj[key].length) {
            // Array
            if (
              (key === 'with_watch_monetization_types'
                && obj.isSearchAllAvailabilities === true)
              || (key === 'with_release_type' && obj.isSearchAllReleases === true)
            ) {
              queryString += '';
            } else if (key === 'vote_average') {
              queryString += `&vote_average_gte=${obj[key][0]}`;
              queryString += `&vote_average_lte=${obj[key][1]}`;
            } else if (key === 'with_runtime') {
              queryString += `&with_runtime_gte=${obj[key][0]}`;
              queryString += `&with_runtime_lte=${obj[key][1]}`;
            } else if (typeof obj[key][0] === 'object') {
              // Array of Object
              queryString += `&${key}=${obj[key]
                .map((item) => item.id)
                .join('%7c')}`;
            } else {
              // Array of String
              queryString += `&${key}=${obj[key].join('%7c')}`;
            }
          } else {
            // Object with Id
            queryString += `&${key}=${obj[key].id}`;
          }
        } else if (
          // Date Object
          Object.prototype.toString.call(obj[key]) === '[object Date]'
        ) {
          if (
            (key === 'air_date_gte' || key === 'air_date_lte')
            && obj.isSearchAllEpisodes === false
          ) {
            queryString += '';
          } else {
            queryString += `&${key}=${dateFormatter(obj[key])}`;
          }
        } else if (
          // String
          (typeof obj[key] === 'string' && obj[key].length > 0)
          || typeof obj[key] === 'number'
        ) {
          queryString += `&${key}=${obj[key]}`;
        }
      });
      return queryString;
    }, []);

    async function getFilteredData(page, obj = null) {
      setIsFetching(true);

      const queryString = generateQueryString(
        obj === null ? filterRef.current : obj,
      );

      const data = await discoverMovies(
        category,
        `${queryString}&page=${page}`,
      );

      const refactoredData = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title || movie.name,
        subTitle: movie.release_date || movie.first_air_date,
        poster: movie.poster_path,
        vote_avg: movie.vote_average,
        overview: movie.overview,
      }));
      if (page < 2) {
        setMovieData([...refactoredData]);
      } else {
        setMovieData([...movieData, ...refactoredData]);
      }
      setIsFetching(false);
    }

    function handleMovieFilterChange(key, value) {
      setMovieFilter({ ...movieFilter, [key]: value });
    }

    useEffect(() => {
      setIsSearchSelectMenuOpen(
        APIData.keywordResult.length > 0 || keywordSearchString !== '',
      );
    }, [APIData.keywordResult.length, keywordSearchString]);

    useEffect(() => {
      if (!isSearchSelectMenuOpen) {
        if (APIData.keywordResult.length > 0) {
          setAPIData({ ...APIData, keywordResult: [] });
        }
        setKeywordSearchString('');
      }
    }, [isSearchSelectMenuOpen]);

    useEffect(() => {
      if (category === 'movie' && subCategory === 'popular') {
        const obj = {
          ...initialCommonFilter,
          ...initialCommonMovieFilter,
          ...popularMovie,
          release_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 6),
          ),
        };
        setInitialMovieFilter(obj);
        setMovieFilter(obj);
        getFilteredData(1, obj);
        filterRef.current = obj;
      } else if (category === 'movie' && subCategory === 'now_playing') {
        const obj = {
          ...initialCommonFilter,
          ...initialCommonMovieFilter,
          ...nowPlayingMovie,
          release_date_gte: new Date(
            new Date().setDate(new Date().getDate() - 36),
          ),
          release_date_lte: new Date(
            new Date().setDate(new Date().getDate() + 6),
          ),
        };
        setInitialMovieFilter(obj);
        setMovieFilter(obj);
        getFilteredData(1, obj);
        filterRef.current = obj;
      } else if (category === 'movie' && subCategory === 'upcoming') {
        const obj = {
          ...initialCommonFilter,
          ...initialCommonMovieFilter,
          ...upComingMovie,
          release_date_gte: new Date(
            new Date().setDate(new Date().getDate() + 6),
          ),
          release_date_lte: new Date(
            new Date().setDate(new Date().getDate() + 27),
          ),
        };
        setInitialMovieFilter(obj);
        setMovieFilter(obj);
        getFilteredData(1, obj);
        filterRef.current = obj;
      } else if (category === 'movie' && subCategory === 'top_rated') {
        const obj = {
          ...initialCommonFilter,
          ...initialCommonMovieFilter,
          ...topRatedMovie,
          release_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 6),
          ),
        };
        setInitialMovieFilter(obj);
        setMovieFilter(obj);
        getFilteredData(1, obj);
        filterRef.current = obj;
      } else if (category === 'tv' && subCategory === 'popular') {
        const obj = {
          ...initialCommonFilter,
          ...initialCommonTVShowFilter,
          ...popularTVShow,
          air_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 6),
          ),
        };
        setInitialMovieFilter(obj);
        setMovieFilter(obj);
        getFilteredData(1, obj);
        filterRef.current = obj;
      } else if (category === 'tv' && subCategory === 'airing_today') {
        const obj = {
          ...initialCommonFilter,
          ...initialCommonTVShowFilter,
          ...airingTodayTVShow,
          air_date_lte: new Date(),
          air_date_gte: new Date(),
        };
        setInitialMovieFilter(obj);
        setMovieFilter(obj);
        getFilteredData(1, obj);
        filterRef.current = obj;
      } else if (category === 'tv' && subCategory === 'on_tv') {
        const obj = {
          ...initialCommonFilter,
          ...initialCommonTVShowFilter,
          ...nowPlayingTVShow,
          air_date_gte: new Date(),
          air_date_lte: new Date(new Date().setDate(new Date().getDate() + 7)),
        };
        setInitialMovieFilter(obj);
        setMovieFilter(obj);
        getFilteredData(1, obj);
        filterRef.current = obj;
      } else if (category === 'tv' && subCategory === 'top_rated') {
        const obj = {
          ...initialCommonFilter,
          ...initialCommonTVShowFilter,
          ...topRatedTVShow,
          air_date_lte: new Date(
            new Date().setMonth(new Date().getMonth() + 6),
          ),
        };
        setInitialMovieFilter(obj);
        setMovieFilter(obj);
        getFilteredData(1, obj);
        filterRef.current = obj;
      }
    }, [category, subCategory]);

    useEffect(() => {
      async function getData() {
        const data = await getAllCountry();
        const languagesData = await getLanguages();
        const watchProvider = await getWatchProvider(
          movieFilter.watch_region.id,
        );

        const refactoredCountryData = data.map((country) => ({
          name: country.english_name,
          id: country.iso_3166_1,
        }));

        const refactoredLanguagesData = languagesData.map((language) => ({
          name: language.english_name,
          id: language.iso_639_1,
        }));

        const refactoredWatchProviderData = watchProvider.results.map(
          (watchProvider) => ({
            name: watchProvider.provider_name,
            id: watchProvider.provider_id,
            logo_path: watchProvider.logo_path,
          }),
        );

        setAPIData({
          ...APIData,
          watchProviderData: refactoredWatchProviderData,
          countryData: refactoredCountryData,
          // filteredData: refactoredCountryData,
          languages: refactoredLanguagesData,
        });
      }
      getData();
    }, []);

    useEffect(() => {
      if (movieFilter.with_watch_providers.length > 0) {
        handleMovieFilterChange('with_watch_providers', []);
      }
    }, [movieFilter.watch_region]);

    useEffect(() => {
      async function getData() {
        const movieGenresData = await getMovieGenres(category);
        const refactoredMovieGenresData = movieGenresData.genres?.map(
          (movieGenre) => ({
            name: movieGenre.name,
            id: movieGenre.id,
          }),
        );
        setgenres(refactoredMovieGenresData);
      }
      getData();
    }, [category]);

    const handleLoadMore = useCallback(
      async (page) => {
        getFilteredData(page);
      },
      [getFilteredData],
    );

    useImperativeHandle(
      ref,
      () => ({
        handleLoadMore,
      }),
      [handleLoadMore],
    );

    async function getWatchProviderData(id) {
      const data = await getWatchProvider(id);
      const refactoredWatchProviderData = data.results.map((watchProvider) => ({
        name: watchProvider.provider_name,
        id: watchProvider.provider_id,
        logo_path: watchProvider.logo_path,
      }));
      setAPIData({
        ...APIData,
        watchProviderData: refactoredWatchProviderData,
        // filteredData: APIData.countryData,
      });
    }

    function arrayCompare(array1, array2) {
      if (array1.length !== array2.length) {
        return false;
      }
      const isSame = array1.some((i) => {
        if (typeof array1[i] === 'object') {
          // eslint-disable-next-line no-use-before-define
          return !objectCompare(array1[i], array2[i]);
        }
        return array1[i] !== array2[i];
      });
      return !isSame;
    }

    function objectCompare(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      const result = keys1.some((key) => {
        if (typeof keys1[key] === 'object') {
          if (Array.isArray(keys1[key])) {
            return !arrayCompare(keys1[key], keys2[key]);
          }
          return !objectCompare(keys1[key], keys2[key]);
        }
        return object1[key] !== object2[key];
      });

      return !result;
    }

    function isMovieFilterChanged(arr) {
      return arr.some((key) => {
        if (
          Object.prototype.toString.call(initialMovieFilter[key])
          === '[object Date]'
        ) {
          // date object
          return typeof movieFilter[key] === 'string'
            ? true
            : initialMovieFilter[key]?.getDate()
                !== movieFilter[key]?.getDate();
        } if (typeof initialMovieFilter[key] === 'object') {
          // object
          return !objectCompare(initialMovieFilter[key], movieFilter[key]);
        }
        // string
        return initialMovieFilter[key] !== movieFilter[key];
      });
    }

    function handleKeywordChange(e) {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        if (e.target.value.trim().length > 0) {
          setIsLoading(true);
          const data = await getKeywords(e.target.value.trim());
          setIsLoading(false);
          const newArr = data.results.filter(
            (item) => !movieFilter.with_keywords.includes(item.name),
          );
          setAPIData({ ...APIData, keywordResult: newArr });
        }
      }, 1000);
    }

    function removeKeyword(value) {
      const newArr = movieFilter.with_keywords.filter((item) => item !== value);
      setMovieFilter({ ...movieFilter, with_keywords: newArr });
    }

    return (
      <div className="movie_detail_left" ref={infiniteScrollRef}>
        <Accordion title="Sort" isAccordianOpen={false}>
          <div className="filter">
            <h3>Sort Results By</h3>
            <SelectMenu
              items={ALL_SORTING_ORDER}
              title="order"
              selectedValue={movieFilter.sort_by?.id}
              changeSelectedValue={(value) => handleMovieFilterChange('sort_by', value)}
            />
          </div>
        </Accordion>

        <Accordion
          title="Where To Watch"
          digit={category === 'movie' ? 55 : 41}
          isAccordianOpen={false}
        >
          <div className="filter">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3>
                My Services
                {' '}
                <span className="question_icon" />
              </h3>
              <div className="checkbox_wrraper">
                <input
                  type="checkbox"
                  id="my_services"
                  className="service_checkbox"
                  disabled
                />
                <label htmlFor="my_services" className="service_desc">
                  Restrict searches to my subscribed services?
                </label>
              </div>
            </div>
          </div>

          <div className="filter">
            <h3>Country</h3>
            <SelectMenu
              items={APIData.countryData}
              title="country"
              menuWidth={300}
              selectedValue={movieFilter.watch_region?.id}
              changeSelectedValue={(value) => {
                handleMovieFilterChange('watch_region', value);
                getWatchProviderData(value.id);
              }}
            />
            <WatchProvider
              data={APIData.watchProviderData}
              selectedItems={movieFilter.with_watch_providers}
              setSelectedItems={(value) => handleMovieFilterChange('with_watch_providers', value)}
            />
          </div>
        </Accordion>

        <Accordion title="Filters" isAccordianOpen>
          <div className="filter">
            <h3>
              Show Me
              {' '}
              <span className="question_icon" />
            </h3>
            <div className="show_me_wrapper">
              <div className="show_me">
                <input
                  type="radio"
                  className="show_me_radioButton"
                  id="allMovie"
                  checked
                />
                <label htmlFor="allMovie" className="show_me_desc">
                  Everything
                </label>
              </div>
              <div className="show_me">
                <input
                  type="radio"
                  className="show_me_radioButton"
                  id="movieHaveNotSeen"
                  disabled
                />
                <label htmlFor="movieHaveNotSeen" className="show_me_desc">
                  Movies | Haven't Seen
                </label>
              </div>
              <div className="show_me">
                <input
                  type="radio"
                  className="show_me_radioButton"
                  id="movieHaveSeen"
                  disabled
                />
                <label htmlFor="movieHaveSeen" className="show_me_desc">
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
                    setMovieFilter({
                      ...movieFilter,
                      isSearchAllAvailabilities: e.target.checked,
                    });
                  }}
                  checked={movieFilter.isSearchAllAvailabilities}
                />
                <label htmlFor="availability" className="availability_desc">
                  Search all availabilities?
                </label>
              </div>

              {!movieFilter.isSearchAllAvailabilities && (
                <CheckboxWrapper
                  items={AVAILABILITIES}
                  selectedItems={movieFilter.with_watch_monetization_types}
                  setSelectedItems={(value) => handleMovieFilterChange(
                    'with_watch_monetization_types',
                    value,
                  )}
                />
              )}
            </div>
          </div>

          {category === 'movie' && (
            <div className="filter">
              <h3>Release Dates</h3>
              <div className="release_date_wrapper">
                <div className="date_checkbox_wrapper">
                  <div className="availability">
                    <input
                      type="checkbox"
                      id="release"
                      className="availability_checkbox"
                      onChange={(e) => {
                        setMovieFilter({
                          ...movieFilter,
                          isSearchAllReleases: e.target.checked,
                        });
                      }}
                      checked={movieFilter.isSearchAllReleases}
                    />
                    <label htmlFor="release" className="availability_desc">
                      Search all release?
                    </label>
                  </div>

                  {!movieFilter.isSearchAllReleases && (
                    <>
                      <div className="availability">
                        <input
                          type="checkbox"
                          id="countries"
                          className="availability_checkbox"
                          onChange={(e) => {
                            setMovieFilter({
                              ...movieFilter,
                              isSearchAllCountries: e.target.checked,
                            });
                          }}
                          checked={movieFilter.isSearchAllCountries}
                        />
                        <label
                          htmlFor="countries"
                          className="availability_desc"
                        >
                          Search all countries?
                        </label>
                      </div>
                      {!movieFilter.isSearchAllCountries && (
                        <SelectMenu
                          items={APIData.countryData}
                          title="country"
                          menuWidth={300}
                          selectedValue={movieFilter.region?.id}
                          changeSelectedValue={(value) => {
                            handleMovieFilterChange('region', value);
                          }}
                        />
                      )}
                      <CheckboxWrapper
                        items={RELEASE_TYPE}
                        selectedItems={movieFilter.with_release_type}
                        setSelectedItems={(value) => handleMovieFilterChange('with_release_type', value)}
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
                              release_date_gte: date !== null ? date : '',
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
                              release_date_lte: date !== null ? date : '',
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

          {category === 'tv' && (
            <div className="filter">
              <h3>Air Dates</h3>
              <div className="release_date_wrapper">
                <div className="date_checkbox_wrapper">
                  <div className="availability">
                    <input
                      type="checkbox"
                      id="searchEpisode"
                      className="availability_checkbox"
                      onChange={(e) => {
                        e.stopPropagation();
                        setMovieFilter({
                          ...movieFilter,
                          isSearchAllEpisodes: e.target.checked,
                          first_air_date_gte:
                            e.target.checked === false
                              ? movieFilter.air_date_gte
                              : '',
                          first_air_date_lte:
                            e.target.checked === false
                              ? movieFilter.air_date_lte
                              : '',
                        });
                      }}
                      checked={movieFilter.isSearchAllEpisodes}
                    />
                    <label htmlFor="searchEpisode" className="availability_desc">
                      Search all episodes?
                    </label>
                  </div>
                  {!movieFilter.isSearchAllEpisodes && (
                    <div className="availability">
                      <input
                        type="checkbox"
                        id="searchFirstAirDate"
                        className="availability_checkbox"
                        onChange={(e) => {
                          e.stopPropagation();
                          setMovieFilter({
                            ...movieFilter,
                            isSearchFirstAirDate: e.target.checked,
                          });
                        }}
                        checked={movieFilter.isSearchFirstAirDate}
                      />
                      <label
                        htmlFor="searchFirstAirDate"
                        className="availability_desc"
                      >
                        Search first air date?
                      </label>
                    </div>
                  )}

                  <div className="date_picker">
                    <div className="date_select">
                      <p>from</p>
                      <span>
                        <DatePicker
                          selected={movieFilter.air_date_gte}
                          onChange={(date) => {
                            setMovieFilter({
                              ...movieFilter,
                              air_date_gte: date !== null ? date : '',
                              first_air_date_gte:
                                movieFilter.isSearchAllEpisodes === false
                                  ? date !== null
                                    ? date
                                    : ''
                                  : '',
                            });
                          }}
                        />
                      </span>
                    </div>
                    <div className="date_select">
                      <p>to</p>
                      <span>
                        <DatePicker
                          selected={movieFilter.air_date_lte}
                          onChange={(date) => {
                            setMovieFilter({
                              ...movieFilter,
                              air_date_lte: date !== null ? date : '',
                              first_air_date_lte:
                                movieFilter.isSearchAllEpisodes === false
                                  ? date !== null
                                    ? date
                                    : ''
                                  : '',
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
              items={genres}
              selectedItems={movieFilter.with_genres}
              setSelectedItems={(value) => handleMovieFilterChange('with_genres', value)}
            />
          </div>

          <div className="filter">
            <h3>Certification</h3>
            <FilterList
              items={['U', 'UA', 'A']}
              selectedItems={movieFilter.certification}
              setSelectedItems={(value) => handleMovieFilterChange('certification', value)}
            />
          </div>

          <div className="filter">
            <h3>
              Language
              {' '}
              <span className="question_icon" />
            </h3>
            <SelectMenu
              items={APIData.languages}
              title="language"
              selectedValue={
                movieFilter?.selectedLanguage?.id || APIData.languages[0]?.id
              }
              changeSelectedValue={(value) => handleMovieFilterChange('selectedLanguage', value)}
            />
          </div>

          <div className="filter">
            <h3>User Score</h3>
            <RangeSlider
              type="user_score"
              values={{
                val: movieFilter.vote_average,
                setValue: (value) => handleMovieFilterChange('vote_average', value),
                min: 0,
                max: 10,
                step: 1,
                marks: [
                  {
                    value: 0,
                    label: '0',
                  },
                  {
                    value: 5,
                    label: '5',
                  },
                  {
                    value: 10,
                    label: '10',
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
                setValue: (value) => handleMovieFilterChange('vote_count_gte', value),
                min: 0,
                max: 500,
                step: 50,
                marks: [
                  {
                    value: 0,
                    label: '0',
                  },
                  {
                    value: 100,
                    label: '100',
                  },
                  {
                    value: 200,
                    label: '200',
                  },
                  {
                    value: 300,
                    label: '300',
                  },
                  {
                    value: 400,
                    label: '400',
                  },
                  {
                    value: 500,
                    label: '500',
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
                setValue: (value) => handleMovieFilterChange('with_runtime', value),
                min: 0,
                max: 400,
                step: 15,
                marks: [
                  {
                    value: 0,
                    label: '0',
                  },
                  {
                    value: 120,
                    label: '120',
                  },
                  {
                    value: 240,
                    label: '240',
                  },
                  {
                    value: 360,
                    label: '360',
                  },
                ],
                valueLabelFormate: (value) => `${value[0]} minutes - ${value[1]} minutes`,
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
                        style={{ cursor: 'pointer' }}
                      />
                    </span>
                  ))}
                </ul>
              )}
              <input
                type="text"
                value={keywordSearchString}
                placeholder="Filter by keywords..."
                className="keyword_search"
                onChange={(e) => {
                  setKeywordSearchString(() => {
                    if (keywordSearchString.trim() !== e.target.value.trim()) {
                      handleKeywordChange(e);
                    }
                    return e.target.value;
                  });
                  // setAPIData({ ...APIData, keywordResult: [] });
                }}
              />
            </div>
            {isSearchSelectMenuOpen && keywordSearchString?.trim() !== '' && (
              <Popper
                referenceElement={referenceElement}
                isSelectMenuOpen={isSearchSelectMenuOpen}
                setIsSelectMenuOpen={setIsSearchSelectMenuOpen}
                ref={popperRef}
              >
                {APIData.keywordResult.length !== 0 ? (
                  <ul className="select_menu_items">
                    {APIData.keywordResult.map((item) => (
                      <li
                        className="select_menu_item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMovieFilter({
                            ...movieFilter,
                            with_keywords: [
                              ...movieFilter.with_keywords,
                              item,
                            ],
                          });
                          setKeywordSearchString('');
                          setAPIData({ ...APIData, keywordResult: [] });
                          popperRef.current.update();
                        }}
                        key={item.id}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="no_data_wrapper">
                    {isLoading === true ? <p>Loading</p> : <p>No data found</p>}
                  </div>
                )}
              </Popper>
            )}
          </div>
        </Accordion>

        <div>
          <button
            type="button"
            className="search_btn"
            disabled={!isMovieFilterChanged(initialMovieFilterKeysArr)}
            onClick={
              () => {
                filterRef.current = movieFilter;
                getFilteredData(1, movieFilter);
                setInitialMovieFilter(movieFilter);
              } // to disable search button again
            }
          >
            Search
          </button>
        </div>
      </div>
    );
  },
);
export default LeftPanel;
