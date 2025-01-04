import React, { useState, useEffect } from "react";
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { StarSolid } from "iconoir-react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const FeaturedToday = () => {
  const dummyMovies = [
    {
      id: 1,
      title: "Movie 1",
      description: "Description of Movie 1",
      image:
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1600&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Movie 2",
      description: "Description of Movie 2",
      image:
        "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?w=1600&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Movie 3",
      description: "Description of Movie 3",
      image:
        "https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=1600&auto=format&fit=crop&q=80",
    },
  ];

  const [visibleMovies, setVisibleMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
      setMoviesPerPage(isLargeScreen ? 5 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const startIndex = currentPage * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    setVisibleMovies(dummyMovies.slice(startIndex, endIndex));
  }, [currentPage, moviesPerPage]);

  const handleNext = () => {
    if ((currentPage + 1) * moviesPerPage < dummyMovies.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container lg:mx-auto sm:mx-0 md:mx-0">
      <div className="flex justify-between items-center w-full mb-4">
        <IconButton
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="bg-transparent hover:bg-gray-400 disabled:opacity-50 w-[2rem] h-[2rem] rounded-full border-none"
        >
          <ArrowLeftCircleIcon className="text-black w-[2rem] h-[2rem]" />
        </IconButton>

        <div className="grid flex-col-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {visibleMovies.map((movie) => (
            <Card
              key={movie.id}
              className="max-w-full w-[50rem] md:w-[27vw] mx-auto shadow-none border-none rounded-[1.5rem] bg-opacity-40"
              style={{
                backgroundcolor: `white`,
                backgroundSize: "center",
                backgroundOpacity: "10%",
              }}
            >
              <Card.Body className="relative overflow-hidden p-0 lg:h-[15rem] sm:h-[13rem] ">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-[10rem] h-[10rem] object-cover p-4  shadow-none border-none -translate-x-0.5 mt-[1%] rounded-[2rem]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 text-white flex items-end p-3">
                  <div className="w-full flex items-center justify-between">
                    {/* <Typography
                      variant="h1"
                      className="sm:text-lg md:text-xl lg:text-xl text-justify font-extrabold text-gray-100"
                    >
                      {movie.title}
                    </Typography>
                    <Typography className="flex items-center gap-1.5">
                      <StarSolid className="h-[18px] w-[18px] text-warning" />
                      5.0
                    </Typography> */}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        <IconButton
          onClick={handleNext}
          disabled={(currentPage + 1) * moviesPerPage >= dummyMovies.length}
          className="bg-transparent hover:bg-gray-400 disabled:opacity-50 w-[2rem] h-[2rem] rounded-full border-none"
        >
          <ArrowRightCircleIcon className="text-black w-[2rem] h-[2rem]" />
        </IconButton>
      </div>
    </div>
  );
};

export default FeaturedToday;
