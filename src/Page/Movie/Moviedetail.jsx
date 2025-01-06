import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import { Moviedetailpath } from "../../utils/APIPath";
import { Spiner } from "../../components/layout/Spiner";
import { useParams } from "react-router-dom";
import Navigation from "../../components/layout/Navigation";
// import Footer from "../../components/layout/Footer"; // Not used in this version
import { FetchMovies } from "../../Services/Fetchmovies";
import {
  Timeline,
  Card,
  Chip,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Footer from "../../components/layout/Footer";
import { PlayIcon, ShareIcon } from "@heroicons/react/24/solid";

const Moviedetail = () => {
  const { id } = useParams();
  const [selectedmovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if (!id) return;
        const apiUrl = Moviedetailpath(id);
        const moviedetails = await FetchMovies(apiUrl);
        setSelectedMovie(moviedetails);
        console.log("Movie details:", moviedetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
    return () => {
      setSelectedMovie(null);
    };
  }, [id]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const movietime = (time) => {
    if (time > 60) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      return `${hours}h ${minutes}m`;
    }
    return `${time}m`;
  };

  const formatMoney = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return windowSize;
  };

  const windowSize = useWindowSize();
  return (
    <React.Fragment>
      {selectedmovie ? (
        windowSize.width > 1024 ? (
          <React.Fragment>
            <Suspense fallback={<Spiner />}>
              <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-md p-2 bg-transparent">
                <Navigation />
              </div>
              <main className="w-full pb-8">
                <section className="w-full flex-grow">
                  <div className="bg-gradient-to-b from-blue-200 to-gray-900 min-h-screen text-white font-sans">
                    <div className=" w-full mx-auto">
                      <div className="relative rounded-lg overflow-hidden shadow-lg max-w-full mx-auto">
                        <div className="w-full aspect-w-16 aspect-h-9">
                          <img
                            src={`https://image.tmdb.org/t/p/original${selectedmovie.poster_path}`}
                            alt={selectedmovie.title}
                            className="object-cover object-top w-full h-[90vh]"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                        <div className="absolute bottom-0 left-0 p-6 text-white">
                          <div className="flex container mx-auto  w-full">
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
                            <div className="flex items-end justify-end h-full mt-8">
                              <IconButton className=" text-black bg-white border-none rounded-full">
                                <ShareIcon className="w-6 h-6" />
                              </IconButton>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                            <div className="bg-gray-800  rounded-3xl object-center items-center w-full">
                              <IconButton className=" bg-green-500 p-4 rounded-3xl">
                                <PlayIcon className="w-full h-32 mx-16" />
                              </IconButton>
                            </div>
                            <div class="bg-gray-800 rounded-3xl flex items-center backdrop-blur-md bg-inherit bg-opacity-55">
                              <div class="rotate-90 items-start justify-start ">
                                <h3 class="text-gray-400 text-xl">RATING</h3>
                              </div>
                              <div className="items-center justify-center p-8">
                                <p class="text-2xl font-bold">
                                  {selectedmovie.adult || "PG-13"}
                                </p>
                              </div>
                            </div>
                            <div class="bg-gray-800 rounded-3xl flex items-center backdrop-blur-md bg-inherit bg-opacity-55-">
                              <div class="rotate-90 items-start justify-start ">
                                <h3 class="text-gray-400 text-xl">RATING</h3>
                              </div>
                              <div className="items-center justify-center p-8">
                                <p class="text-2xl font-bold">
                                  {selectedmovie.adult || "PG-13"}
                                </p>
                              </div>
                            </div>
                            <div class="bg-gray-800 rounded-3xl flex items-center backdrop-blur-md bg-inherit bg-opacity-30">
                              <div class="rotate-90 items-start justify-start ">
                                <h3 class="text-gray-400 text-xl">RATING</h3>
                              </div>
                              <div className="items-center justify-center p-8">
                                <p class="text-2xl font-bold">
                                  {selectedmovie.adult || "PG-13"}
                                </p>
                              </div>
                            </div>
                            <div class="bg-gray-800 rounded-3xl flex items-center backdrop-blur-md bg-inherit bg-opacity-30">
                              <div class="rotate-90 items-start justify-start ">
                                <h3 class="text-gray-400 text-xl">RATING</h3>
                              </div>
                              <div className="items-center justify-center p-8">
                                <p class="text-2xl font-bold">
                                  {selectedmovie.adult || "PG-13"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex w-full p-6">
                        <div className="w-full">
                          <Typography className="text-xl font-semibold mb-2">
                            Description
                          </Typography>
                          <Typography className="text-justify sm:text-sm md:text-base lg:text-lg break-words line-clamp-5 text-gray-300">
                            {selectedmovie.overview}
                          </Typography>
                        </div>
                        <div className="w-1/2 p-8">
                          <Typography className="text-xl font-semibold mb-2">
                            Hype
                          </Typography>
                        </div>
                      </div>

                      {/* Cast Section */}
                      <div className="mt-8 p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          Notable Cast
                        </h3>
                        <div className="flex space-x-6">
                          <div className="text-center">
                            <img
                              src="/path-to-chris-pratt.jpg"
                              alt="Chris Pratt"
                              className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                            <p className="mt-2">Chris Pratt</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="/path-to-anya-taylor-joy.jpg"
                              alt="Anya Taylor-Joy"
                              className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                            <p className="mt-2">Anya Taylor-Joy</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="/path-to-charlie-day.jpg"
                              alt="Charlie Day"
                              className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                            <p className="mt-2">Charlie Day</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-8 p-6">
                        <h3 className="text-xl font-semibold mb-4">
                          Other Upcoming Films
                        </h3>
                        <div className="flex space-x-4">
                          <img
                            src="/path-to-upcoming-film1.jpg"
                            alt="Upcoming Film 1"
                            className="w-36 h-52 object-cover rounded-lg"
                          />
                          <img
                            src="/path-to-upcoming-film2.jpg"
                            alt="Upcoming Film 2"
                            className="w-36 h-52 object-cover rounded-lg"
                          />
                          <img
                            src="/path-to-upcoming-film3.jpg"
                            alt="Upcoming Film 3"
                            className="w-36 h-52 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
              <footer className="w-full mt-auto bg-white p-8">
                <Footer />
              </footer>
            </Suspense>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Suspense fallback={<Spiner />}>
              <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-md p-2 bg-transparent">
                <Navigation />
              </div>
              <main className="w-full pb-8">
                <section className="w-full flex-grow">
                  <div className="bg-gradient-to-b from-blue-200 to-gray-900 min-h-screen text-white font-sans">
                    <div className="max-w-full mx-auto px-4 py-8">
                      <div className="relative rounded-lg overflow-hidden shadow-lg max-w-full mx-auto">
                        <div className="w-full aspect-w-16 aspect-h-9">
                          <img
                            src={`https://image.tmdb.org/t/p/original${selectedmovie.poster_path}`}
                            alt={selectedmovie.title}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                          <h2 className="text-4xl font-extrabold mb-2">
                            The Super Mario Bros. Movie
                          </h2>
                          <p className="flex space-x-2 mb-4">
                            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                              Fantasy
                            </span>
                            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                              Family
                            </span>
                            <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                              Action
                            </span>
                          </p>
                          <div className="flex gap-4 mt-8">
                            <button className="bg-green-500 px-6 py-3 rounded-full font-semibold text-lg hover:bg-green-600 transition">
                              Save
                            </button>
                            <button className="bg-green-500 px-6 py-3 rounded-full font-semibold text-lg hover:bg-green-600 transition">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Info Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        <div className="bg-gray-800 p-4 rounded-lg text-center">
                          <h3 className="text-sm text-gray-400">RATING</h3>
                          <p className="text-lg font-bold">PG</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg text-center">
                          <h3 className="text-sm text-gray-400">RELEASE</h3>
                          <p className="text-lg font-bold">April 7, 2023</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg text-center">
                          <h3 className="text-sm text-gray-400">BUDGET</h3>
                          <p className="text-lg font-bold">$130M</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg text-center">
                          <h3 className="text-sm text-gray-400">LENGTH</h3>
                          <p className="text-lg font-bold">126 min</p>
                        </div>
                      </div>

                      {/* Description Section */}
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">
                          Description
                        </h3>
                        <p className="text-gray-300">
                          A Brooklyn Plumber named Mario, travels through the
                          Mushroom Kingdom with a Princess and an
                          Anthropomorphic Mushroom named Toad to find Mario's
                          Brother, Luigi, and to save the world from a ruthless
                          fire-breathing Koopa named Bowser.
                        </p>
                      </div>

                      {/* Cast Section */}
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">
                          Notable Cast
                        </h3>
                        <div className="flex space-x-6">
                          <div className="text-center">
                            <img
                              src="/path-to-chris-pratt.jpg"
                              alt="Chris Pratt"
                              className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                            <p className="mt-2">Chris Pratt</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="/path-to-anya-taylor-joy.jpg"
                              alt="Anya Taylor-Joy"
                              className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                            <p className="mt-2">Anya Taylor-Joy</p>
                          </div>
                          <div className="text-center">
                            <img
                              src="/path-to-charlie-day.jpg"
                              alt="Charlie Day"
                              className="w-24 h-24 rounded-full object-cover mx-auto"
                            />
                            <p className="mt-2">Charlie Day</p>
                          </div>
                        </div>
                      </div>

                      {/* Other Upcoming Films Section */}
                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">
                          Other Upcoming Films
                        </h3>
                        <div className="flex space-x-4">
                          <img
                            src="/path-to-upcoming-film1.jpg"
                            alt="Upcoming Film 1"
                            className="w-36 h-52 object-cover rounded-lg"
                          />
                          <img
                            src="/path-to-upcoming-film2.jpg"
                            alt="Upcoming Film 2"
                            className="w-36 h-52 object-cover rounded-lg"
                          />
                          <img
                            src="/path-to-upcoming-film3.jpg"
                            alt="Upcoming Film 3"
                            className="w-36 h-52 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
              <footer className="w-full mt-auto bg-white p-8">
                <Footer />
              </footer>
            </Suspense>
          </React.Fragment>
        )
      ) : (
        <Spiner />
      )}
    </React.Fragment>
  );
};

export default Moviedetail;
