import React, { useState, useEffect } from "react";
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { NavArrowLeft, NavArrowRight, StarSolid } from "iconoir-react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const TrendingMoviesCard = () => {
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
    <div className="grid mx-auto p-4 w-full">
      <div className="flex items-center justify-between p-4 sm:max-w-[25rem] md:max-w-[30rem] lg:max-w-[90rem] pr-6">
        <Typography>Trending Movies</Typography>
        <div className="flex gap-2">
          <IconButton
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="bg-transparent hover:bg-gray-400 disabled:opacity-50 w-4 h-4 rounded-full"
          >
            <NavArrowLeft className="h-3 w-3 text-black" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={(currentPage + 1) * moviesPerPage >= dummyMovies.length}
            className="bg-transparent hover:bg-gray-400 disabled:opacity-50 w-2 h-2 rounded-full"
          >
            <NavArrowRight className="h-3 w-3 text-black" />
          </IconButton>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 w-[24rem] md:w-full lg:w-full mx-auto sm:mr-[12rem] pr-4">
        {visibleMovies.map((movie) => (
          <Card
            key={movie.id}
            className="max-w-full w-[100vw] md:w-[90vw] mx-auto shadow-none bg-transparent border-none"
          >
            <Card.Body className="relative overflow-hidden p-0 h-[13rem] shadow-lg">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 text-white flex items-end p-3">
                <div className="w-full flex items-center justify-between">
                  <Typography
                    variant="h1"
                    className="text-lg font-extrabold text-gray-100"
                  >
                    {movie.title}
                  </Typography>
                  <Typography className="flex items-center gap-1.5">
                    <StarSolid className="h-5 w-5 text-yellow-500" />
                    5.0
                  </Typography>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingMoviesCard;
