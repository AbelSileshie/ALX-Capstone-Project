export const Loginendpoint = `${
  import.meta.env.VITE_API_SUPABASE_URL
}/auth/v1/token?grant_type=password`;
export const Signupendpoint = `${
  import.meta.env.VITE_API_SUPABASE_URL
}/auth/v1/signup`;
export const DiscoverMovies = `${
  import.meta.env.VITE_TMDB_API_URL
}/discover/movie?include_adult=false&include_video=true&language=en-US&page=1&sort_by=popularity.desc}`;
export const posterpath = `https://image.tmdb.org/t/p/original/`;
export const UpcomingMovies = `${
  import.meta.env.VITE_TMDB_API_URL
}//movie/top_rated?language=en-US&page=1`;
export const NowPlayingMovies = `${
  import.meta.env.VITE_TMDB_API_URL
}/movie/now_playing?language=en-US&page=1`;
export const TopRatedMovies = `${
  import.meta.env.VITE_TMDB_API_URL
}/movie/top_rated?language=en-US&page=1`;
export const Moviedetailpath = (id) => {
  return `${import.meta.env.VITE_TMDB_API_URL}/movie/${id}?language=en-US`;
};
export const LatestSeries = `${
  import.meta.env.VITE_TMDB_API_URL
}/tv/latest?language=en-US`;
export const TopRatedSeries = `${
  import.meta.env.VITE_TMDB_API_URL
}/tv/top_rated?language=en-US&page=1`;
export const PopularSeries = `${
  import.meta.env.VITE_TMDB_API_URL
}/tv/popular?language=en-US&page=1`;
export const SeriesDetail = (id) => {
  return `${import.meta.env.VITE_TMDB_API_URL}/tv/${id}?language=en-US`;
};
export const MovieCastPath = (id) => {
  return `${
    import.meta.env.VITE_TMDB_API_URL
  }/movie/${id}/credits?language=en-US`;
};
export const RelatedMovie = (movie_id) => {
  return `${import.meta.env.VITE_TMDB_API_URL}/movie/${movie_id}/similar`;
};
export const PopularPersons = `${
  import.meta.env.VITE_TMDB_API_URL
}/person/popular`;
export const RelatedSeries = (movie_id) => {
  return `${import.meta.env.VITE_TMDB_API_URL}/tv/${movie_id}/similar`;
};
export const PersonDetail = (person_id) => {
  return `${import.meta.env.VITE_TMDB_API_URL}/person/${person_id}?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }`;
};
export const MovieTrailer = (movie_id) => {
  return `${
    import.meta.env.VITE_TMDB_API_URL
  }/movie/${movie_id}/videos?language=en-US`;
};
export const SearchMovie = (query) => {
  return `${import.meta.env.VITE_TMDB_API_URL}/search/movie?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&query=${query}`;
};
export const SearchSeries = (query) => {
  return `${import.meta.env.VITE_TMDB_API_URL}/search/tv?api_key=${
    import.meta.env.VITE_TMDB_API_KEY
  }&query=${query}`;
};
export const DayTrendingMovies = (type) =>
  `${import.meta.env.VITE_TMDB_API_URL}/trending/movie/day`;
export const WeekTrendingMovies = (type) =>
  `${import.meta.env.VITE_TMDB_API_URL}/trending/movie/week`;
