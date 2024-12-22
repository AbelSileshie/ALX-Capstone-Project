import React, { useState, useEffect } from "react";
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { StarSolid } from "iconoir-react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const TopIMDB = () => {
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
    {
      id: 4,
      title: "Movie 4",
      description: "Description of Movie 4",
      image:
        "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=1600&auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      title: "The Dumb Abd Dumber",
      description: "Description of Movie 5",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      title: "Movie 6",
      description: "Description of Movie 6",
      image:
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1600&auto=format&fit=crop&q=80",
    },
    {
      id: 7,
      title: "Movie 7",
      description: "Description of Movie 7",
      image:
        "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?w=1600&auto=format&fit=crop&q=80",
    },
    {
      id: 8,
      title: "Movie 8",
      description: "Description of Movie 8",
      image:
        "https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=1600&auto=format&fit=crop&q=80",
    },
  ];

  const [visibleMovies, setVisibleMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [moviesPerPage, setMoviesPerPage] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
      setMoviesPerPage(isLargeScreen ? 5 : 2);
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
    <div className="container grid grid-col items-center lg:mx-auto sm:mx-2 md:mx-0">
      <div className="flex justify-between w-full mx-auto mb-4 my-auto">
        <IconButton
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className=" bg-transparent hover:bg-gray-400 disabled:opacity-50 w-[2rem] h-[2rem] rounded-full border-none"
        >
          <ArrowLeftCircleIcon
            className="text-black w-[2rem] h-[2rem]"
            color="black"
          />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={(currentPage + 1) * moviesPerPage >= dummyMovies.length}
          className=" bg-transparent hover:bg-gray-400 disabled:opacity-50 w-[2rem] h-[2rem] rounded-full border-none"
        >
          <ArrowRightCircleIcon
            className="text-black w-[2rem] h-[2rem]"
            color="black"
          />
        </IconButton>
      </div>

      <div className="flex gap-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 sm:w-[22rem] md:w-full lg:w-full mx-0">
        <div className="col-span-1 sm:col-span-5 lg:col-span-5 flex flex-col-2 sm:flex-col-2 lg:flex-col-5 gap-5 w-full">
          {visibleMovies.map((movie) => (
            <Card
              key={movie.id}
              className="w-full lg:max-w-[20rem] sm:max-w-[20rem] md:max-w-[13rem] shadow-none bg-transparent border-none rounded-[2rem] sm:mx-auto p-0 lg:ml-5 sm:ml-0 md:ml-5"
            >
              <Card.Body className="relative overflow-hidden p-0 lg:h-[15rem] sm:h-[15rem] shadow-lg ">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 text-white flex items-end p-3">
                  <div className="w-full flex items-center justify-between">
                    <Typography
                      variant="h1"
                      className="sm:text-sm md:text-xl lg:text-xl text-justify font-extrabold text-grey-100"
                    >
                      {movie.title}
                    </Typography>
                    <Typography className="flex items-center gap-1.5">
                      <StarSolid className="h-[18px] w-[18px] text-warning" />
                      5.0
                    </Typography>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="flex justify-end items-center col-span-1 sm:col-span-1 lg:col-span-1 w-auto my-auto mx-2"></div>
      </div>
    </div>
  );
};

export default TopIMDB;
