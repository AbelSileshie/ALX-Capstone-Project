import React, { Suspense, useState } from "react";
import Heroscetion from "../../components/specific/Home/Herosection";
import FeaturedToday from "../../components/specific/Home/FeaturedToday";
import TopIMDB from "../../components/specific/Home/TopIMDB";
import TrendingMoviesCard from "../../components/specific/Home/Tredingmoviescard";
import Theatre from "../../components/specific/Home/Thetre";
import { Card, Typography } from "@material-tailwind/react";
import { useBackgroundStore } from "../../store/BackgroundStore";
import Celebrties from "../../components/specific/Home/Celebrties";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { SearchMovie } from "../../utils/APIPath";
import { FetchMovies } from "../../Services/Fetchmovies";
import { posterpath } from "../../utils/APIPath";
import Rating from "../../components/common/Rating";
import { useNavigate } from "react-router-dom";
const Spiner = React.lazy(() => import("../../components/layout/Spiner"));

const Movies = () => {
  const [selectedMovie, setSelectedMovie] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [isSearching, setIsSearching] = useState(false); // To toggle visibility of other sections
  const background = useBackgroundStore((state) => state.background);

  // Fetch movies from TMDb API
  const fetchMovies = async (query) => {
    if (!query) return;
    setIsSearching(true); // Start searching
    try {
      const Search = SearchMovie(query);
      const Fetchsearch = await FetchMovies(Search);
      setSearchResults(Fetchsearch.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Fetch movies if the input value is not empty
    if (value.trim() !== "") {
      fetchMovies(value);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };
  const Navigate = useNavigate();
  const selecthandler = (movie) => {
    setSelectedMovie(movie);
    Navigate(`/movie/${movie.id}`);
  };
  return (
    <Suspense fallback={<Spiner />}>
      <div className="sticky top-0 left-0 w-full z-50 shadow-md p-2 bg-black">
        <Navigation />
      </div>
      <main className="w-full pb-8 bg-black color-white">
        <section className="w-full flex-grow pt-2 p-2">
          <div className="w-full flex flex-col mt-0 rounded-lg mx-auto shadow-none h-full bg-black">
            <div className="w-full">
              {/* Search Section */}
              <section className="w-auto h-72 relative">
                <div className="flex flex-col items-center justify-center mb-4">
                  <img
                    src="https://image.tmdb.org/t/p/original//zOpe0eHsq0A2NvNyBbtT6sj53qV.jpg"
                    alt="Movie Banner"
                    className="w-full h-72 rounded-lg object-cover"
                  />
                  <div className="absolute mt-4 w-full flex justify-center">
                    <input
                      type="text"
                      placeholder="Search for movies..."
                      className="w-3/4 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </section>

              {/* Search Results */}
              {isSearching && (
                <section className="w-full bg-black p-4">
                  <Typography variant="h4" className="text-white mb-4">
                    Search Results
                  </Typography>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {searchResults.map((movie) => (
                      <div
                        key={movie.id}
                        className="flex flex-col items-center bg-gray-800 rounded-lg p-2"
                      >
                        <Card
                          key={movie.id}
                          className="max-w-full w-auto md:w-[90vw] mx-auto shadow-none bg-transparent border-none"
                        >
                          <Card.Body className="relative overflow-hidden p-0 h-[13rem] shadow-lg">
                            <div className=" absolute flex items-center justify-end sm:mx-24 lg:mx-36 w-12 h-12 md:mx-36 bg-black bg-opacity-50">
                              <Rating rating={movie.vote_average} />
                            </div>
                            <img
                              src={`${posterpath}${movie.poster_path}`}
                              alt={movie.title}
                              className="w-[10rem] h-full object-contain object-top rounded-md mx-auto cursor-pointer"
                              onClick={() => selecthandler(movie)}
                            />
                          </Card.Body>
                          <Card.Footer className="flex justify-between items-center w-full mx-auto">
                            <div className="  text-white flex items-end p-3 mx-auto">
                              <div className="w-full flex items-center justify-between">
                                <Typography
                                  variant="h1"
                                  className="text-lg font-extrabold text-gray-100"
                                >
                                  {movie.title}
                                </Typography>
                              </div>
                            </div>
                          </Card.Footer>
                        </Card>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Main Content - Hidden during Search */}
              {!isSearching && (
                <>
                  <section className="bg-black">
                    <Suspense fallback={<Spiner />}>
                      <FeaturedToday />
                    </Suspense>
                  </section>
                  <section className="">
                    <Suspense fallback={<Spiner />}>
                      <TrendingMoviesCard />
                    </Suspense>
                  </section>
                  <section className="">
                    <Suspense fallback={<Spiner />}>
                      <Celebrties />
                    </Suspense>
                  </section>
                  <section className="bg-gradient-to-b from-black via-transparent to-transparent">
                    <Theatre />
                  </section>
                  <section className="">
                    <Suspense fallback={<Spiner />}>
                      <TopIMDB />
                    </Suspense>
                  </section>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full mt-auto p-8 bg-black/90">
        <Footer />
      </footer>
    </Suspense>
  );
};

export default Movies;
