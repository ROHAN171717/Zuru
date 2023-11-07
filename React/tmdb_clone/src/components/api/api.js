const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 1d89162391a00b377990d9a88bd59b0b',
  },
};

async function fetchAPI(url) {
  const x = await fetch(url, options);
  const data = await x.json();
  return data;
}

export function getTrendingMovies(category) {
  const url = `https://api.themoviedb.org/3/trending/movie/${category}?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getPopularMovies(category, tvShowOrMovie) {
  const url = `https://api.themoviedb.org/3/${tvShowOrMovie}/${category}?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b`;
  // return new Promise((resolve, reject) => {
  //     fetch(url, options)
  // .then((response) => resolve(response.json()))
  // .catch ((error) => reject(error));
  // })
  return fetchAPI(url);
}

export function getAllCountry() {
  const url = 'https://api.themoviedb.org/3/configuration/countries?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b';
  return fetchAPI(url);
}

export function getWatchProvider(watchRegion) {
  const url = `https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=${watchRegion}&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getLanguages() {
  const url = 'https://api.themoviedb.org/3/configuration/languages?api_key=1d89162391a00b377990d9a88bd59b0b';
  return fetchAPI(url);
}

export function discoverMovies(category, queryString) {
  const url = `https://api.themoviedb.org/3/discover/${category}?language=en-US${queryString}&certification_country=IN&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getKeywords(keyword) {
  const url = `https://api.themoviedb.org/3/search/keyword?query=${keyword}&page=1&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getMovieGenres(category) {
  const url = `https://api.themoviedb.org/3/genre/${category}/list?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getMovieDetailById(category, movieId) {
  const url = `https://api.themoviedb.org/3/${category}/${movieId}?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getCastData(category, movieId) {
  const url = `https://api.themoviedb.org/3/${category}/${movieId}/credits?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getReviews(category, movieId) {
  const url = `https://api.themoviedb.org/3/${category}/${movieId}/reviews?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getKeywordsById(category, movieId) {
  const url = `https://api.themoviedb.org/3/${category}/${movieId}/keywords?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getRecommendations(category, movieId) {
  const url = `https://api.themoviedb.org/3/${category}/${movieId}/recommendations?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}

export function getVideosById(category, movieId) {
  const url = `https://api.themoviedb.org/3/${category}/${movieId}/videos?language=en-US&api_key=1d89162391a00b377990d9a88bd59b0b`;
  return fetchAPI(url);
}
