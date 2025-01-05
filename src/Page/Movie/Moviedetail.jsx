import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import { Moviedetailpath } from "../../utils/APIPath";
import { Spiner } from "../../components/layout/Spiner";
import { useParams } from "react-router-dom";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { FetchMovies } from "../../Services/Fetchmovies";
import { Timeline, Card, Chip, Typography } from "@material-tailwind/react";
const Moviedetail = () => {
  const { id } = useParams();
  const [step, setStep] = React.useState(0);
  const [selectedmovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if (!id) return;
        const apiUrl = Moviedetailpath(id);
        const moviedetails = await FetchMovies(apiUrl);
        setSelectedMovie(moviedetails);
        console.log("Movie details:", moviedetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
    return () => {
      setSelectedMovie(null);
    };
  }, [id]);
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };
  const movietime = (time) => {
    if (time > 60) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      return `${hours}h ${minutes}m`;
    }
    return `${time}m`;
  };
  return (
    <React.Fragment>
      {selectedmovie ? (
        <React.Fragment>
          <Suspense fallback={<Spiner />}>
            <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-md p-2 bg-transparent">
              <Navigation />
            </div>
            <main className="pb-8 w-[100vw]">
              <section className="flex pt-2 p-2">
                <div className=" w-full h-full bg-gray-100">
                  <div className="">
                    <div className="p-2">
                      <Typography type="h3">{selectedmovie.title}</Typography>
                    </div>
                    <div className="flex items-center gap-4 w-full  m-2">
                      <div className="w-full">
                        <ul className="flex items-center gap-2">
                          <li>
                            <Typography>
                              {selectedmovie.release_date.slice(0, 4)}
                            </Typography>
                          </li>
                          <li>
                            <Typography>
                              {movietime(selectedmovie.runtime)}
                            </Typography>
                          </li>
                          <li>
                            <Typography>
                              {selectedmovie.adult || "Not Rated"}
                            </Typography>
                          </li>
                        </ul>
                      </div>
                      <div className="flex items-center justify-end gap-1  lg:pr-20 md:pr-14 sm:pr-">
                        <Chip isPill={false} variant="gradient">
                          <Chip.Label>Rate</Chip.Label>
                        </Chip>
                        <Chip isPill={false} variant="gradient" className="m-0">
                          <Chip.Label>
                            <Chip.Label>
                              {selectedmovie.vote_average.toFixed(1)} /10
                              {() => formatNumber(selectedmovie.vote_count)}(
                              {formatNumber(selectedmovie.vote_count)})
                            </Chip.Label>
                          </Chip.Label>
                        </Chip>
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className=" w-full sm:hidden lg:block md:block">
                      <img
                        src={`https://image.tmdb.org/t/p/original${selectedmovie.poster_path}`}
                        alt={selectedmovie.title}
                        className="w-full h-full rounded-lg shadow-md object-center object-cover"
                      />
                    </div>
                    <div className="">
                      <img
                        src={`https://image.tmdb.org/t/p/original${selectedmovie.backdrop_path}`}
                        alt={selectedmovie.title}
                        className="w-full h-auto rounded-lg shadow-md object-center"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </main>
            <footer className="mt-auto bg-white p-8">
              <Footer />
            </footer>
          </Suspense>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Spiner />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Moviedetail;
