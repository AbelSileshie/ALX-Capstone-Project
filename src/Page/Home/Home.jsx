import React, { Suspense } from "react";
import Heroscetion from "../../components/specific/Home/Herosection";
import FeaturedToday from "../../components/specific/Home/FeaturedToday";
import TopIMDB from "../../components/specific/Home/TopIMDB";
import TrendingMoviesCard from "../../components/specific/Home/Tredingmoviescard";
import Theatre from "../../components/specific/Home/Thetre";
import { Typography } from "@material-tailwind/react";
import { useBackgroundStore } from "../../store/BackgroundStore";
const Spiner = React.lazy(() => import("../../components/layout/Spiner"));

const Home = () => {
  const background = useBackgroundStore((state) => state.background);

  return (
    <div className="w-full flex flex-col mt-0 rounded-lg  mx-auto shadow-none h-full bg-black ">
      <div className="w-full ">
        <section className="w-auto h-[90vh]">
          <Suspense fallback={<Spiner />}>
            <Heroscetion />
          </Suspense>
        </section>

        <section className=" bg-black">
          <Suspense fallback={<Spiner />}>
            <FeaturedToday />
          </Suspense>
        </section>

        {/* Trending Movies */}
        <section className="">
          <Suspense fallback={<Spiner />}>
            <TrendingMoviesCard />
          </Suspense>
        </section>

        {/* Theatre Section */}
        <section className=" bg-gradient-to-b from-black via-transparent to-transparent ">
          <Theatre />
        </section>
        <section className="sm:p-8">
          <Suspense fallback={<Spiner />}>
            <TopIMDB />
          </Suspense>
        </section>
      </div>
    </div>
  );
};

export default Home;
