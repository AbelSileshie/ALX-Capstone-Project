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
} from "iconoir-react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { FetchMovies } from "../../../Services/Fetchmovies";
import { posterpath } from "../../../utils/APIPath";
import Error500 from "../../error/Error500";
import { DiscoverMovies } from "../../../utils/APIPath";
import { Spiner } from "../../layout/Spiner";
import { useNavigate } from "react-router-dom";
import { getGenreNames } from "../../../utils/Utilties";
import { BookmarkIcon } from "@heroicons/react/24/solid";
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

export default function Herosection() {
  const [selectedMovie, setSelectedMovie] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [Genre, SetGenre] = React.useState([]);
  const Navigate = useNavigate();
  React.useEffect(() => {
    const fetchAndStoreMovies = async () => {
      try {
        const movieData = await FetchMovies(DiscoverMovies);
        setMovies(movieData.results);
      } catch (error) {}
    };
    setLoading(false);
    fetchAndStoreMovies();
    return () => {};
  }, [setMovies]);
  const selecthandler = (movie) => {
    setSelectedMovie(movie);
    Navigate(`/movie/${movie.id}`);
  };

  return (
    <div>
      {loading ? (
        <>
          <Spiner />
        </>
      ) : (
        <React.Suspense fallback={<Error500 />}>
          <div className="w-full object-cover">
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
                disableOnInteraction: false,
              }}
              loop={true}
              className="relative rounded-lg [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background"
            >
              {Array.isArray(movies) &&
                movies.map((movie, index) => (
                  <SwiperSlide key={index} className="relative select-none">
                    <img
                      src={`${posterpath}${movie.backdrop_path}`}
                      alt={`image-${movie.title}`}
                      className="sm:h-[95vh] md:h-[32rem] lg:h-[33rem] w-full sm:0bject-center md:object-center  lg:object-top"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent">
                      <div className="relative container mx-auto lg:px-2 sm:px-0 flex items-end p-2 justify-start h-full text-center text-white gap-5  bg-transparent ">
                        <Card
                          onClick={() => selecthandler(movie)}
                          className="w-full max-w-[10rem] shadow-none bg-transparent border-none rounded-[2rem] p-1 sm:hidden lg:block md:block cursor-pointer  "
                        >
                          <Card.Body className="relative overflow-hidden p-0 lg:h-[13rem] md:h-[13rem] sm:h-[15rem] shadow-lg">
                            <img
                              src={`${posterpath}${movie.poster_path}`}
                              alt={`image-${movie.title}`}
                              className="w-full h-full object-cover shadow-lg cursor-pointer"
                            />

                            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />

                            <IconButton
                              size="sm"
                              color="error"
                              variant="ghost"
                              className="!absolute right-2 top-2 rounded-full"
                              onClick={() => selecthandler(movie)}
                            >
                              <BookmarkIcon className="h-5 w-5" color="black" />
                            </IconButton>
                          </Card.Body>
                        </Card>
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <Typography
                              variant="h1"
                              className="sm:text-3xl md:text-3xl lg:text-3xl ml-6"
                            >
                              {movie.title}
                            </Typography>
                            <Typography className="flex items-center gap-1.5 ">
                              <StarSolid className="h-[18px] w-[18px] text-warning" />
                              {movie.vote_average.toFixed(1)}
                            </Typography>
                          </div>
                          <div className="p-5">
                            <Typography className="text-justify sm:text-sm md:text-base lg:text-lg  md:max-w-[20rem] lg:max-w-[35rem] break-words line-clamp-5">
                              {movie.overview}
                            </Typography>
                            <div className="flex items-center gap-2">
                              {getGenreNames(movie.genre_ids.slice(0, 3)).map(
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
                                className="flex items-center gap-1 w- text-white p-2"
                              >
                                <Typography>Watchlist</Typography>
                                <BookmarkIcon
                                  className="h-5 w-5"
                                  color="white"
                                />
                              </IconButton>
                              <IconButton
                                variant="outline"
                                className="flex items-center gap-1 w-36 text-white p-2"
                                onClick={() => selecthandler(movie)}
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
