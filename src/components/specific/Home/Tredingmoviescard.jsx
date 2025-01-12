import React, { useState, useEffect } from "react";
import { Card, Typography, IconButton, Button } from "@material-tailwind/react";
import { NavArrowLeft, NavArrowRight, StarSolid } from "iconoir-react";
import { FetchMovies } from "../../../Services/Fetchmovies";
import {
  DayTrendingMovies,
  TopRatedMovies,
  WeekTrendingMovies,
} from "../../../utils/APIPath";
import { posterpath } from "../../../utils/APIPath";
import Rating from "../../common/Rating";
import { useNavigate } from "react-router-dom";
const TrendingMoviesCard = () => {
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(null);
  const [movies, setMovies] = useState([]);

  const [select, setSelect] = useState(TopRatedMovies);

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
        const fetchedMovies = await FetchMovies(select);
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
  }, [moviesPerPage, select]);
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
  const selecthandler = (text) => {
    if (text === "Day") {
      setSelect(DayTrendingMovies);
    } else if (text === "Week") {
      setSelect(WeekTrendingMovies);
    }
  };
  const [selectedMovie, setSelectedMovie] = React.useState([]);
  const Navigate = useNavigate();
  const selecthandler2 = (movie) => {
    setSelectedMovie(movie);
    Navigate(`/movie/${movie.id}`);
  };
  return (
    <div className="w-full">
      <div className="flex items-center p-4 gap-5 justify-between">
        <div className=" flex  items-center  w-[90vw] h-full ">
          <Typography
            color="primary"
            className="text-yellow-500 font-mono font-extrabold sm:text-xl text-2xl cursor-pointer"
          >
            |Top Rated IMDB
          </Typography>
          <div className=" justify-start items-start m-2 ml-5 flex gap-2">
            <Button
              variant={select === DayTrendingMovies ? "solid" : "outline"}
              onClick={() => selecthandler("Day")}
            >
              Day
            </Button>
            <Button
              variant={select === WeekTrendingMovies ? "solid" : "outline"}
              onClick={() => selecthandler("Week")}
            >
              Week
            </Button>
          </div>
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
      <div className="grid gap-5 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 w-[21rem] md:w-full lg:w-full mx-auto p-2">
        {visibleMovies.map((movie) => (
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
                onClick={() => selecthandler2(movie)}
                className="w-[10rem] h-full object-contain object-top rounded-md mx-auto cursor-pointer"
              />
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
