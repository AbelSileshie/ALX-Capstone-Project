import React, { useState, useEffect } from "react";
import { Card, Typography, IconButton, Avatar } from "@material-tailwind/react";
import { NavArrowLeft, NavArrowRight, StarSolid } from "iconoir-react";
import { FetchMovies } from "../../../Services/Fetchmovies";
import { PopularPersons } from "../../../utils/APIPath";
import { posterpath } from "../../../utils/APIPath";
const Celebrties = () => {
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
        const Celebrties = PopularPersons;
        const fetchedMovies = await FetchMovies(Celebrties);
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
            |Most Popular Celebrties
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
      <div className="grid gap-5 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 w-[21rem] md:w-full lg:w-full mx-auto p-4 pb-12">
        {visibleMovies.map((movie) => (
          <Card
            key={movie.id}
            className="max-w-full w-auto md:w-[90vw] mx-auto shadow-none bg-transparent border-none"
          >
            <Card.Body className="relative overflow-hidden p-0 h-[25rem] shadow-lg">
              <div className="grid items-center justify-center">
                <Avatar
                  src={`${posterpath}${movie.profile_path}`}
                  alt="avatar"
                  className=" w-96  h-80 object-cover object-top rounded-2xl"
                />
              </div>
              <div className=" mx-auto items justify-center p-4">
                <Typography className="text-center text-white">
                  {movie.name}
                </Typography>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Celebrties;
