import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import {
  MovieCastPath,
  Moviedetailpath,
  RelatedMovie,
} from "../../utils/APIPath";
import { Spiner } from "../../components/layout/Spiner";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/layout/Navigation";
import { posterpath } from "../../utils/APIPath";
import { FetchMovies } from "../../Services/Fetchmovies";
import { Typography, IconButton } from "@material-tailwind/react";
import Footer from "../../components/layout/Footer";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  PlayIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import {
  formatDate,
  movietime,
  formatMoney,
  useWindowSize,
} from "../../utils/Utilties";
import Mobile from "../../components/specific/Movie/Mobile";
import { FacebookTag, Instagram, Movie, Twitter } from "iconoir-react";
import { useMovieStore } from "../../store/UseMovieStore";
import { AuthStore } from "../../store/UseAuthStore";
const Moviedetail = () => {
  const { id } = useParams();
  const [selectedmovie, setSelectedMovie] = useState(null);
  const [Moviecast, setMovieCast] = useState([]);
  const [Related, setRelated] = useState([]);
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if (!id) return;
        const apiUrl = Moviedetailpath(id);
        const movieDetails = await FetchMovies(apiUrl);
        setSelectedMovie(movieDetails);
        console.log("Movie details:", movieDetails);

        const castApiUrl = MovieCastPath(id);
        const castDetails = await FetchMovies(castApiUrl);
        setMovieCast(castDetails.cast || []);
        const relatedApiUrl = RelatedMovie(id);
        const Relatedmoviefetch = await FetchMovies(relatedApiUrl);
        setRelated(Relatedmoviefetch.results || []);
        console.log("related movies", Related);
      } catch (error) {
        console.error("Error fetching movie details or cast:", error);
      }
    };

    fetchMovieDetail();

    return () => {
      setSelectedMovie(null);
      setMovieCast([]); // Reset the cast
    };
  }, [id]);
  const windowSize = useWindowSize();
  const navigate = useNavigate();

  const selectHandler = (movieId) => {
    navigate(`/movie/${movieId}`);
    console.log("navigation Activated,", movieId);
  };
  const { isMovieSaved, addMovie, removeMovie } = useMovieStore();

  const handleSaveMovie = (selectedmovie) => {
    const Toekn = AuthStore.getState().token;
    if (!Toekn) {
      navigate("/login");
      console.log("Please login to save movie", Toekn);
      addMovie();
    } else {
    }
    addMovie(selectedmovie);
    console.log("Movie saved:", selectedmovie);
  };

  const handleRemoveMovie = (movieId) => {
    removeMovie(movieId);
    console.log("Movie removed:", movieId);
  };
  return (
    <React.Fragment>
      {selectedmovie ? (
        windowSize.width > 1024 ? (
          <React.Fragment>
            <Suspense fallback={<Spiner />}>
              <div className="sticky top-0 left-0 w-full z-50  shadow-md p-2 bg-black">
                <Navigation />
              </div>
              <main className="w-full">
                <section className="w-full flex-grow">
                  <div className="bg-gradient-to-b from-blue-200 to-gray-900 min-h-screen text-white font-sans">
                    <div className=" w-full mx-auto">
                      <div className="relative rounded-lg overflow-hidden shadow-lg max-w-full mx-auto">
                        <div className="w-full aspect-w-16 aspect-h-9">
                          <img
                            src={`${posterpath}${selectedmovie.backdrop_path}`}
                            alt={selectedmovie.title}
                            className="object-cover object-center w-full h-[90vh]"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                        <div className="absolute bottom-0 left-0 p-0 text-white ">
                          <div className="flex container mx-auto  w-full mt-36">
                            <div className=" w-full">
                              <h2 className="text-4xl font-extrabold mb-1">
                                <Typography type="h3">
                                  {selectedmovie.title}
                                </Typography>
                              </h2>
                              <p className="flex space-x-2 mb-4">
                                {selectedmovie.genres.map((genre) => (
                                  <span
                                    key={genre.id}
                                    className="bg-purple-600 px-3 py-1 rounded-full text-sm"
                                  >
                                    {genre.name}
                                  </span>
                                ))}
                              </p>
                            </div>
                            <div className="flex items-end justify-end h-full mt-8 gap-2">
                              <IconButton
                                as="a"
                                className=" text-blawhiteck bg-inherit border-none rounded-lg"
                                href={`https://www.imdb.com/title/${selectedmovie.imdb_id}`}
                                target="_blank"
                              >
                                <ShareIcon className="w-4 h-4" />
                              </IconButton>

                              <IconButton
                                variant="outline"
                                onClick={() =>
                                  isMovieSaved(selectedmovie.id)
                                    ? handleRemoveMovie(selectedmovie.id)
                                    : handleSaveMovie(selectedmovie)
                                }
                                className={`flex items-center justify-center border-none mx-auto ${
                                  isMovieSaved(selectedmovie.id)
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {isMovieSaved(selectedmovie.id) ? (
                                  <>
                                    <BookmarkSlashIcon className="h-5 w-5" />
                                  </>
                                ) : (
                                  <>
                                    <BookmarkIcon className="h-5 w-5" />
                                  </>
                                )}
                              </IconButton>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-auto h-full container mx-12 mt-6">
                            <div className="bg-gray-800  rounded-3xl object-center items-center w-full">
                              <IconButton className=" bg-green-500 p-4 rounded-3xl">
                                <PlayIcon className="w-full h-32 mx-16" />
                              </IconButton>
                            </div>
                            <div class="bg-gray-800 rounded-3xl flex items-center backdrop-blur-md bg-inherit bg-opacity-55">
                              <div class="-rotate-90 items-start justify-start ">
                                <div />
                                <h3 class="text-gray-400 text-xl">RELEASE</h3>
                              </div>
                              <div className="items-center justify-center">
                                <p class="text-2xl font-bold">
                                  {formatDate(selectedmovie.release_date)}
                                </p>
                              </div>
                            </div>
                            <div class="bg-gray-800 rounded-3xl flex items-center backdrop-blur-md bg-inherit bg-opacity-55-">
                              <div class="-rotate-90 items-start justify-start ">
                                <h3 class="text-gray-400 text-xl">RATING</h3>
                              </div>
                              <div className="items-center justify-center p-8">
                                <p class="text-2xl font-bold">
                                  {selectedmovie.adult || "PG-13"}
                                </p>
                              </div>
                            </div>
                            <div class="bg-gray-800 rounded-3xl flex items-center backdrop-blur-md bg-inherit bg-opacity-30">
                              <div class="-rotate-90 items-start justify-start ">
                                <h3 class="text-gray-400 text-xl">BUDGET</h3>
                              </div>
                              <div className="items-center justify-center p-8">
                                <p class="text-2xl font-bold">
                                  ${formatMoney(selectedmovie.budget)}
                                </p>
                              </div>
                            </div>
                            <div class="bg-gray-800 rounded-3xl flex items-center backdrop-blur-md bg-inherit bg-opacity-30">
                              <div class="-rotate-90 items-start justify-start ">
                                <h3 class="text-gray-400 text-xl">LENGTH</h3>
                              </div>
                              <div className="items-center justify-center p-8">
                                <p class="text-2xl font-bold">
                                  {movietime(selectedmovie.runtime)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-auto contaner">
                        <div className=" justify-end items-end w-[80%] container p-8">
                          <div className=" flex">
                            <div className="w-full p-4">
                              <Typography className="text-xl font-semibold mb-2 text-gray-500">
                                Description
                              </Typography>
                              <Typography className="text-justify sm:text-sm md:text-base lg:text-lg break-words line-clamp-5 text-white-200">
                                {selectedmovie.overview}
                              </Typography>
                            </div>
                          </div>
                          <div className="grid overflow-hidden">
                            <h3 className="text-xl font-semibold mb-2">
                              Notable Cast
                            </h3>
                            <div className="flex  space-x-6 p-8 overflow-hidden w-full h-full">
                              {Moviecast.slice(0, 6).map((cast) => (
                                <div
                                  key={cast.id}
                                  className="text-center mx-auto"
                                >
                                  <img
                                    src={`${posterpath}${cast.profile_path}`}
                                    alt={cast.name}
                                    className="w-32 h-32 rounded-full object-cover mx-auto"
                                  />
                                  <p className="mt-2">{cast.name}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-8 p-12 mx-auto container overflow-hidden">
                            <h3 className="text-xl font-semibold mb-4">
                              Related Movies
                            </h3>
                            <div className="flex space-x-4 p-8 overflow-y-auto">
                              {Related.map((movie) => (
                                <img
                                  key={movie.id}
                                  src={`${posterpath}${movie.poster_path}`}
                                  alt={movie.title}
                                  className="w-36 h-52 object-cover rounded-lg"
                                  onClick={() => selectHandler(movie.id)}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="container w-auto grid">
                          <div className="w-full max-w-md p-4 bg-inherit rounded-lg shadow-lg mt-8">
                            {/* Social Media Icons */}
                            <div className="flex justify-start items-center gap-4 mb-4">
                              <a href="#" className="text-black">
                                <FacebookTag />
                              </a>
                              <a href="#" className="text-black">
                                <Instagram />
                              </a>
                              <a href="#" className="text-black">
                                <Twitter />
                              </a>
                            </div>

                            {/* Facts Section */}
                            <div className="space-y-4">
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-700">
                                  Original Name
                                </span>
                                <span className="text-black">
                                  {selectedmovie.title}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-700">
                                  Status
                                </span>
                                <span className="text-black">
                                  {selectedmovie.status}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-700">
                                  Production Companies
                                </span>
                                {selectedmovie.production_companies.map(
                                  (company) => (
                                    <>
                                      <div className="flex items-center">
                                        <div>
                                          <img
                                            src={`${posterpath}${company.logo_path}`}
                                            alt={company.name}
                                            className="object-contain rounded-full w-12 h-12"
                                          />
                                        </div>
                                        <div className=" p-4">
                                          <span
                                            key={company.id}
                                            className="block"
                                          >
                                            {company.name}
                                          </span>
                                        </div>
                                      </div>
                                    </>
                                  )
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-700">
                                  Type
                                </span>
                                {selectedmovie.genres.map((genre) => (
                                  <span
                                    key={genre.id}
                                    className=" px-3 py-1 rounded-full text-sm"
                                  >
                                    {genre.name}
                                  </span>
                                ))}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-700">
                                  Original Language
                                </span>
                                <span className="text-black">
                                  {selectedmovie.original_language}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
              <footer className="w-full mt-auto p-8 bg-black">
                <Footer />
              </footer>
            </Suspense>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Mobile
              selectedmovie={selectedmovie}
              Moviecast={Moviecast}
              Related={Related}
            />
          </React.Fragment>
        )
      ) : (
        <Spiner />
      )}
    </React.Fragment>
  );
};

export default Moviedetail;
