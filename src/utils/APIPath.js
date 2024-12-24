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
}/movie/upcoming?language=en-US&page=1`;
export const NowPlayingMovies = `${
  import.meta.env.VITE_TMDB_API_URL
}/movie/now_playing?language=en-US&page=1`;
export const TopRatedMovies = `${
  import.meta.env.VITE_TMDB_API_URL
}//movie/top_rated?language=en-US&page=1`;
