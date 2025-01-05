import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import { NavArrowLeft, NavArrowRight, StarSolid } from "iconoir-react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { posterpath, UpcomingMovies } from "../../../utils/APIPath";
import { FetchMovies } from "../../../Services/Fetchmovies";

const FeaturedToday = () => {
  const [dummyMovies, SetDummyMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(null);

  useEffect(() => {
    const fetchAndStoreMovies = async () => {
      try {
        const apiUrl = UpcomingMovies;
        const movieData = await FetchMovies(apiUrl);

        if (Array.isArray(movieData.results)) {
          SetDummyMovies(movieData.results);
        } else {
          console.warn("Unexpected API response:", movieData);
          SetDummyMovies([]);
        }
      } catch (error) {
        console.error("Error in HeroSection fetch:", error);
        SetDummyMovies([]);
      }
    };

    fetchAndStoreMovies();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1280) {
        setMoviesPerPage(3);
      } else if (screenWidth >= 1024) {
        setMoviesPerPage(3);
      } else if (screenWidth >= 768) {
        setMoviesPerPage(2);
      } else {
        setMoviesPerPage(1);
      }
    };

    const fetchTrending = async () => {
      try {
        // Simulate fetching movies from an API
        const fetchedMovies = await new Promise((resolve) =>
          setTimeout(() => resolve(dummyMovies), 1000)
        );

        setVisibleMovies(fetchedMovies.slice(0, moviesPerPage));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Initialize moviesPerPage based on the current window width
    handleResize();

    // Fetch and set movies after moviesPerPage is defined
    fetchTrending();

    // Attach the resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener
      window.removeEventListener("resize", handleResize);
    };
  }, [moviesPerPage]);

  useEffect(() => {
    const startIndex = currentPage * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    setVisibleMovies(dummyMovies.slice(startIndex, endIndex));
  }, [currentPage, moviesPerPage, dummyMovies]);

  const handleNext = () => {
    if (
      dummyMovies.length > 0 &&
      (currentPage + 1) * moviesPerPage < dummyMovies.length
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full md:mx-auto lg:mx-auto sm:mx-0">
      <div className="flex justify-start items-center p-4">
        <div className=" justify-between items-end w-full h-full">
          <Typography>Test</Typography>
        </div>
        <div className="flex gap-3">
          <IconButton
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="bg-transparent hover:bg-gray-400 disabled:opacity-50 w-8 h-8 rounded-full"
          >
            <NavArrowLeft className="h-6 w-6 text-black" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={(currentPage + 1) * moviesPerPage >= dummyMovies.length}
            className="bg-transparent hover:bg-gray-400 disabled:opacity-50 w-8 h-8 rounded-full"
          >
            <NavArrowRight className="h-6 w-6 text-black" />
          </IconButton>
        </div>
      </div>
      <div className="container w-screen lg:mx-auto sm:mx-0 md:mx-auto ">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:w-[95vw] md:w-[90vw] sm:w-[90vw] justify-center items-center">
          {visibleMovies.map((movie) => (
            <Card
              key={movie.id}
              className="lg:w-full md:w-full sm:max-w-full lg:mx-0 sm:mx-3 shadow-none border-none rounded-[1.5rem] bg-white bg-opacity-40  "
            >
              <Card.Body className="relative overflow-hidden p-0 lg:h-[15rem] sm:h-[13rem]">
                <div
                  className="relative w-full h-full"
                  style={{
                    backgroundImage: `url(${posterpath}${movie.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="flex w-full h-full inset-0 bg-gradient-to-b from-black/40 to-black/80  flex-col justify-center items- p-2 text-white">
                    <div className="flex">
                      <img
                        src={`${posterpath}${movie.poster_path}`}
                        alt={movie.title}
                        className="w-[7rem] h-full object-cover object-center rounded-md mr-2"
                      />
                      <div className="grid items-center justify-start">
                        <div className="flex items-center mt-2">
                          <Typography
                            variant="h2"
                            className="font-extrabold mr-3"
                          >
                            {movie.title}
                          </Typography>
                          <StarSolid className="h-5 w-5 text-yellow-400 mr-1" />
                          <Typography>{movie.vote_average}</Typography>
                        </div>
                        <Typography className="font-extralight text-justify w-22 p-1 break-words line-clamp-3">
                          {movie.overview}
                        </Typography>
                        <div className="flex flex-co items-center gap-4">
                          <Chip isPill={false} variant="solid">
                            <Chip.Label>Action</Chip.Label>
                          </Chip>
                          <Chip isPill={false} variant="solid">
                            <Chip.Label>Action</Chip.Label>
                          </Chip>
                        </div>
                        <div className="p-2 flex gap-4">
                          <Typography>Save</Typography>
                          <Typography>More Info</Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedToday;
