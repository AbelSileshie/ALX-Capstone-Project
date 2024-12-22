import React from "react";
import Heroscetion from "../../components/specific/Home/Herosection.jsx";
import FeaturedToday from "../../components/specific/Home/FeaturedToday.jsx";
import TopIMDB from "../../components/specific/Home/TopIMDB.jsx";
import TrendingMoviesCard from "../../components/specific/Home/Tredingmoviescard.jsx";
import Thetre from "../../components/specific/Home/Thetre.jsx";
import { Typography } from "@material-tailwind/react";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
const Home = () => {
  return (
    <div className="flex flex-col p-0 mt-0 space-y-6 bg-gray-50 rounded-lg shadow-md ">
      <section>
        <div className="w-full">
          <Heroscetion />
        </div>
      </section>
      <section>
        <div className="w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 p-3">
            Featured Movies
          </h2>
          <FeaturedToday />
        </div>
      </section>
      <section>
        <div className="w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 p-3">
            Trending Movies
          </h2>
          <TrendingMoviesCard />
        </div>
      </section>
      <section>
        <div className="w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 p-3">
            Top On IMDB This Week
          </h2>
          <TopIMDB />
        </div>
      </section>
      <section>
        <div className="w-full">
          <Typography className="text-xl font-semibold text-gray-800 mb-4 p-3">
            Coming soon to theaters
            <ArrowRightCircleIcon className=" bg-transparent text-gray-800 w-[2rem]" />
          </Typography>
          <Thetre />
        </div>
      </section>
    </div>
  );
};
export default Home;
