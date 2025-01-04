import React, { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { StarSolid } from "iconoir-react";
import { useBackgroundStore } from "../../../store/BackgroundStore";
import { FetchMovies } from "../../../Services/Fetchmovies";
import { posterpath } from "../../../utils/APIPath";
import { UpcomingMovies } from "../../../utils/APIPath";

const Theatre = () => {
  const [background, setBackground] = useState("");
  const [movies, setMovies] = useState([]);

  const handleBackground = (movie) => {
    const newBackground = `${posterpath}${movie.backdrop_path}`;
    setBackground(newBackground);
    useBackgroundStore.setState({ background: newBackground });
  };

  useEffect(() => {
    const fetchAndStoreMovies = async () => {
      try {
        const apiUrl = UpcomingMovies;
        const movieData = await FetchMovies(apiUrl);

        if (movieData?.results?.length > 0) {
          // Set the first movie's backdrop as the default background
          handleBackground(movieData.results[0]);
        }

        setMovies(movieData.results || []);
      } catch (error) {
        console.error("Error in HeroSection fetch:", error);
      }
    };

    fetchAndStoreMovies();
  }, []);

  return (
    <div className="container lg:mx-auto sm:mx-0 md:mx-0">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex flex-col-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="max-w-full w-[80vw] md:w-[27vw] mx-auto shadow-none bg-transparent border-none rounded-[1.5rem]"
              onMouseEnter={() => handleBackground(movie)}
            >
              <div className="relative overflow-hidden p-0 lg:h-[15rem] sm:h-[13rem] shadow-lg">
                <img
                  src={`${posterpath}${movie.backdrop_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 text-white flex items-end p-3">
                  <div className="w-full flex items-center justify-between">
                    <Typography
                      variant="h1"
                      className="sm:text-lg md:text-xl lg:text-xl text-justify font-extrabold text-gray-100"
                    >
                      {movie.title}
                    </Typography>
                    <Typography className="flex items-center gap-1.5">
                      <StarSolid className="h-[18px] w-[18px] text-warning" />
                      {(movie.vote_average || 0).toFixed(1)}
                    </Typography>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theatre;
