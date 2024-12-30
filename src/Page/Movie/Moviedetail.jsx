import React, { useState } from "react";
import { useEffect } from "react";
import { FetchMovieDetails } from "../../Services/FetchMovieDetails";
import { Moviedetailpath } from "../../utils/APIPath";
import { Spiner } from "../../components/layout/Spiner";
import { useParams } from "react-router-dom";
const Moviedetail = () => {
  const { id } = useParams();
  const [selectedmovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if (!id) return;
        const apiUrl = Moviedetailpath(id);
        console.log("API URL", apiUrl);
        const moviedetails = await FetchMovieDetails(apiUrl);
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
        <React.Fragment>{selectedmovie.title}</React.Fragment>
      ) : (
        <React.Fragment>
          <Spiner />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Moviedetail;
