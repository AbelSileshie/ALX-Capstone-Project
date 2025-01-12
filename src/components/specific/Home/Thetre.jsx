"use client";

import "swiper/css";

import "swiper/css/navigation";

import "swiper/css/pagination";

import * as React from "react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { IconButton, Typography, Card, Chip } from "@material-tailwind/react";

import {
  NavArrowRight,
  NavArrowLeft,
  StarSolid,
  ArrowRightCircleSolid,
  Movie,
} from "iconoir-react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { FetchMovies } from "../../../Services/Fetchmovies";
import {
  LatestSeries,
  posterpath,
  TopRatedSeries,
  UpcomingMovies,
} from "../../../utils/APIPath";
import Error500 from "../../error/Error500";
import { Spiner } from "../../layout/Spiner";
import { useNavigate } from "react-router-dom";
import { getGenreNames } from "../../../utils/Utilties";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/solid";
import { useMovieStore } from "../../../store/UseMovieStore";
import { selectHandler } from "../../../utils/Utilties";
function CustomNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slidePrev()}
        className="dark !absolute left-2 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowLeft className="h-7 w-7 -translate-x-0.5 stroke-2" />
      </IconButton>

      <IconButton
        isCircular
        size="lg"
        variant="ghost"
        color="secondary"
        onClick={() => swiper.slideNext()}
        className="dark !absolute right-2 top-1/2 z-10 -translate-y-1/2"
      >
        <NavArrowRight className="h-7 w-7 translate-x-px stroke-2" />
      </IconButton>
    </>
  );
}

function customPagination(_, className) {
  return `<span class="${className} w-4 h-4 [&.swiper-pagination-bullet-active]:!opacity-100 [&.swiper-pagination-bullet-active]:[background:rgb(var(--color-background))] !opacity-50 ![background:rgb(var(--color-background))]"></span>`;
}

export default function Upcoming() {
  const [selectedMovie, setSelectedMovie] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [genre, setGenre] = React.useState([]);
  const navigate = useNavigate();
  const { isMovieSaved, addMovie, removeMovie } = useMovieStore();

  React.useEffect(() => {
    const fetchAndStoreMovies = async () => {
      try {
        const movieData = await FetchMovies(UpcomingMovies);
        setMovies(movieData.results);
        console.log("Movies", movieData);
      } catch (error) {
        console.error("Error in HeroSection fetch:", error);
      }
    };
    setLoading(false);
    fetchAndStoreMovies();
    return () => {
      console.log("Component unmounted, movies:", movies);
    };
  }, [setMovies]);
  const handleSaveMovie = (movie) => {
    addMovie(movie);
    console.log("Movie saved:", movie);
  };

  const handleRemoveMovie = (movieId) => {
    removeMovie(movieId);
    console.log("Movie removed:", movieId);
  };
  const selecthandler = (movieId, type) => {
    navigate(`/${type}/${movieId}`);
  };
  return (
    <div>
      {loading ? (
        <Spiner />
      ) : (
        <React.Suspense fallback={<Error500 />}>
          <div className="w-full object-cover bg-gradient-to-b from-black to-black/50">
            <Swiper
              pagination={{
                enabled: true,
                clickable: true,
                dynamicBullets: true,
                renderBullet: customPagination,
              }}
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{
                delay: 10000,
                disableOnInteraction: true,
              }}
              loop={true}
              className="relative rounded-lg"
            >
              {Array.isArray(movies) &&
                movies.map((movie, index) => (
                  <SwiperSlide key={index} className="relative select-none">
                    <img
                      src={`${posterpath}${movie.backdrop_path}`}
                      alt={`image-${movie.title}`}
                      className="lg:h-[75vh] md:h-[20rem] sm:h-[20rem] w-full"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent flex">
                      <div className="relative container mx-12 lg:px-2 sm:px-0 flex items-center my-auto justify-start text-center text-white gap-5 bg-transparent ">
                        <div className="h-full">
                          <div className="mb-2 flex items-center justify-between ">
                            <Typography
                              variant="h1"
                              className="sm:text-xl md:text-xl lg:text-2xl"
                            >
                              {movie.name}
                            </Typography>
                            <Typography className="flex items-center gap-1.5 ">
                              <StarSolid className="h-[18px] w-[18px] text-warning" />
                              {movie.vote_average.toFixed(1)}
                            </Typography>
                          </div>
                          <div className="">
                            <Typography className="text-justify sm:text-sm md:text-base lg:text-lg  md:max-w-[20rem] lg:max-w-[35rem] break-words line-clamp-3">
                              {movie.overview}
                            </Typography>
                            <div className="flex items-center gap-2">
                              {getGenreNames(movie.genre_ids.slice(0, 1)).map(
                                (genre, index) => (
                                  <Chip
                                    key={index}
                                    isPill={false}
                                    variant="solid"
                                  >
                                    <Chip.Label>{genre}</Chip.Label>
                                  </Chip>
                                )
                              )}
                            </div>
                            <div className="flex justify-start items-start gap-4 mt-2">
                              <IconButton
                                variant="outline"
                                onClick={() =>
                                  isMovieSaved(movie.id)
                                    ? handleRemoveMovie(movie.id)
                                    : handleSaveMovie(movie)
                                }
                                className={`flex items-center gap-1 ${
                                  isMovieSaved(movie.id)
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {isMovieSaved(movie.id) ? (
                                  <>
                                    <BookmarkSlashIcon className="h-5 w-5" />
                                    Remove
                                  </>
                                ) : (
                                  <>
                                    <BookmarkIcon className="h-5 w-5" />
                                    Save
                                  </>
                                )}
                              </IconButton>
                              <IconButton
                                variant="outline"
                                className="flex items-center gap-1 w-36 text-white p-2 cursor-pointer"
                                onClick={() => {
                                  const type = "series"; // Declare `type` properly
                                  selecthandler(movie.id, type);
                                }}
                              >
                                <Typography>View details</Typography>
                                <ArrowRightCircleSolid />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              <CustomNavigation />
            </Swiper>
          </div>
        </React.Suspense>
      )}
    </div>
  );
}
