import React, { Suspense, useState } from "react";
import { useEffect } from "react";
import { Moviedetailpath } from "../../utils/APIPath";
import { Spiner } from "../../components/layout/Spiner";
import { useParams } from "react-router-dom";
import Navigation from "../../components/layout/Navigation";
import Footer from "../../components/layout/Footer";
import { FetchMovies } from "../../Services/Fetchmovies";
const Moviedetail = () => {
  const { id } = useParams();
  const [selectedmovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if (!id) return;
        const apiUrl = Moviedetailpath(id);
        console.log("API URL", apiUrl);
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
  return (
    <React.Fragment>
      {selectedmovie ? (
        <React.Fragment>
          <Suspense fallback={<Spiner />}>
            <div className="sticky top-0 left-0 w-full z-50 bg-white shadow-md p-2 bg-transparent">
              <Navigation />
            </div>
            <main className="pb-8">
              <section className="flex-grow pt-2 p-2">
                {selectedmovie.original_title}
                {selectedmovie.overview}
                {selectedmovie.tagline}
                {selectedmovie.vote_average}
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
