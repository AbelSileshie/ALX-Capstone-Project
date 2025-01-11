import React, { Suspense } from "react";
import Navigation from "../../layout/Navigation";
import Error404 from "../../error/Error404";
import Footer from "../../layout/Footer"; // Ensure Footer is imported
import { Spiner } from "../../layout/Spiner";
import { IconButton, Typography } from "@material-tailwind/react";
import { posterpath } from "../../../utils/APIPath";
import { useNavigate } from "react-router-dom";
import {
  formatDate,
  formatMoney,
  movietime,
  selectHandler,
} from "../../../utils/Utilties";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { useMovieStore } from "../../../store/UseMovieStore";
import { AuthStore } from "../../../store/UseAuthStore";
import { FacebookTag, Instagram, Twitter } from "iconoir-react";

const Mobile = ({ selectedmovie, Moviecast, Related }) => {
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
  const navigate = useNavigate();

  const selectHandler = (movieId) => {
    navigate(`/movie/${movieId}`);
    console.log("navigation Activated,", movieId);
  };
  return (
    <Suspense fallback={<Spiner />}>
      {selectedmovie ? (
        <React.Fragment>
          <div className="sticky top-0 left-0 w-full z-50 shadow-md p-2 bg-black">
            <Navigation />
          </div>
          <main className="w-full">
            <section className="w-full flex-grow">
              <div className="bg-gradient-to-b from-blue-200 to-gray-900 min-h-screen text-white font-sans">
                <div className="max-w-full mx-auto justify-between">
                  <div className="relative rounded-lg overflow-hidden shadow-lg max-w-full mx-auto">
                    <div className="w-full h-full">
                      <img
                        src={`${posterpath}${selectedmovie.poster_path}`}
                        alt={selectedmovie.title}
                        className="object-cover object-top w-full h-[60vh]"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-1 ml-3 text-white w-full">
                      <div className="flex ">
                        <div>
                          <h2 className="text-4xl font-extrabold mb-2">
                            {selectedmovie.title}
                          </h2>
                        </div>
                        <div className="items-end justify-end p-2">
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
                  </div>

                  {/* Info Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <h3 className="text-sm text-gray-400">RELEASE</h3>
                      <p className="text-lg font-bold">
                        {formatDate(selectedmovie.release_date)}
                      </p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <h3 className="text-sm text-gray-400">RATING</h3>
                      <p className="text-lg font-bold">
                        {selectedmovie.adult || "PG-13"}
                      </p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <h3 className="text-sm text-gray-400">BUDGET</h3>
                      <p className="text-lg font-bold">
                        ${formatMoney(selectedmovie.budget)}
                      </p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg text-center">
                      <h3 className="text-sm text-gray-400">LENGTH</h3>
                      <p className="text-lg font-bold">
                        {movietime(selectedmovie.runtime)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 p-4">
                    <Typography className="text-xl font-semibold mb-2 text-gray-200">
                      Description
                    </Typography>
                    <Typography className="text-justify sm:text-sm md:text-base lg:text-lg break-words line-clamp-8 text-gray-200">
                      {selectedmovie.overview}
                    </Typography>
                    <div className="flex gap-4 mt-2"></div>
                  </div>
                  <div className=" w-full grid">
                    <div className="w-full  p-8 bg-inherit rounded-lg shadow-lg  mx-auto">
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
                        {selectedmovie.production_companies.map((company) => (
                          <>
                            <div className="flex items-center">
                              <div>
                                <img
                                  src={`${posterpath}${company.logo_path}`}
                                  className="object-contain rounded-full w-12 h-12"
                                />
                              </div>
                              <div className=" p-4">
                                <span key={company.id} className="block">
                                  {company.name}
                                </span>
                              </div>
                            </div>
                          </>
                        ))}
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
                <div className="grid overflow-hidden">
                  <h3 className="text-xl font-semibold mb-2">Notable Cast</h3>
                  <div className="flex  space-x-6 p-2 overflow-y-hidden w-full h-full">
                    {Moviecast.slice(0, 8).map((cast) => (
                      <div key={cast.id} className="text-center mx-auto">
                        <img
                          src={`${posterpath}${cast.profile_path}`}
                          alt={cast.name}
                          className="w-12 h-12 rounded-xl object-cover object-top mx-auto"
                        />
                        <p className="mt-2">{cast.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 p-2 mx-auto  overflow-hidden">
                  <h3 className="text-xl font-semibold mb-4">More Like This</h3>
                  <div className="flex space-x-4 p-8 overflow-y-auto">
                    {Related.map((movie) => (
                      <img
                        key={movie.id}
                        src={`${posterpath}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-36 h-52 object-cover rounded-lg cursor-pointer"
                        onClick={() => selectHandler(movie.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
          <footer className="w-full mt-auto bg-black p-8">
            <Footer />
          </footer>
        </React.Fragment>
      ) : (
        <Error404 />
      )}
    </Suspense>
  );
};

export default Mobile;
