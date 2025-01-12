import React, { useState, useEffect } from "react";
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { NavArrowLeft, NavArrowRight, StarSolid } from "iconoir-react";
import { FetchMovies } from "../../../Services/Fetchmovies";
import { PopularSeries } from "../../../utils/APIPath";
import { posterpath } from "../../../utils/APIPath";
const TrendingMoviesCard = () => {
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      let newMoviesPerPage;
      if (screenWidth >= 1280) {
        newMoviesPerPage = 5;
      } else if (screenWidth >= 1024) {
        newMoviesPerPage = 5;
      } else if (screenWidth >= 768) {
        newMoviesPerPage = 3;
      } else {
        newMoviesPerPage = 2;
      }

      if (newMoviesPerPage !== moviesPerPage) {
        setMoviesPerPage(newMoviesPerPage);
      }
    };

    const fetchMovies = async () => {
      try {
        const popular = PopularSeries;
        const fetchedMovies = await FetchMovies(popular);
        setMovies(fetchedMovies.results);
        console.log(fetchedMovies.results);
        setVisibleMovies(fetchedMovies.results.slice(0, moviesPerPage || 5));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    handleResize();
    fetchMovies();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [moviesPerPage]);
  useEffect(() => {
    if (moviesPerPage !== null) {
      const startIndex = currentPage * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      setVisibleMovies(movies.slice(startIndex, endIndex));
    }
  }, [currentPage, moviesPerPage, movies]);

  const handleNext = () => {
    if ((currentPage + 1) * moviesPerPage < movies.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-start items-center p-4">
        <div className=" justify-between items-end w-[90vw] h-full ">
          <Typography
            color="primary"
            className="text-yellow-500 font-mono font-extrabold sm:text-xl text-2xl cursor-pointer"
          >
            |Top Rated IMDB
          </Typography>
        </div>
        <div className="flex gap-3">
          <IconButton
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="bg-transparent hover:bg-gray-400 disabled:opacity-50 w-8 h-8 rounded-full"
          >
            <NavArrowLeft className="h-6 w-6 text-white" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={(currentPage + 1) * moviesPerPage >= movies.length}
            className="bg-transparent hover:bg-gray-400 disabled:opacity-50 w-8 h-8 rounded-full"
          >
            <NavArrowRight className="h-6 w-6 text-white" />
          </IconButton>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 w-[21rem] md:w-full lg:w-full mx-1">
        {visibleMovies.map((movie) => (
          <Card
            key={movie.id}
            className="max-w-full w-auto md:w-[90vw] mx-auto shadow-none bg-transparent border-none"
          >
            <Card.Body className="relative overflow-hidden p-0 h-[13rem] shadow-lg">
              <img
                src={`${posterpath}${movie.poster_path}`}
                alt={movie.title}
                className="w-[10rem] h-full object-contain object-top rounded-md mx-auto"
              />
              <div className=" absolute inset-0 bg-black/30 flex items-start justify-start mx-12 p-2 w-16 h-12">
                <Typography className="flex items-center gap-1.5">
                  <StarSolid className="h-5 w-5 text-yellow-500" />
                  {movie.vote_average.toFixed(1)}
                </Typography>
              </div>
            </Card.Body>
            <Card.Footer className="flex justify-between items-center w-full mx-auto">
              <div className="  text-white flex items-end p-3 mx-auto">
                <div className="w-full flex items-center justify-between">
                  <Typography
                    variant="h1"
                    className="text-lg font-extrabold text-gray-100"
                  >
                    {movie.name}
                  </Typography>
                </div>
              </div>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingMoviesCard;
