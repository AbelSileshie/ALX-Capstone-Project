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
    <div className="w-full flex flex-col mt-0 rounded-lg  mx-auto shadow-none">
      <div className="w-full">
        <section className="w-[98vw] h-auto mx-auto">
          <Suspense fallback={<Spiner />}>
            <Heroscetion />
          </Suspense>
        </section>

        <section className="">
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
        <section
          className="bg-cover bg-center bg-no-repeat bg-gradient-to-tl from-black/30 via-transparent to-black/90 text-white"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="w-full h-auto p-8 overflow-y-auto">
            <Suspense fallback={<Spiner />}>
              <Theatre />
            </Suspense>
          </div>
        </section>

        {/* Top IMDB Section */}
        <section className="">
          <Suspense fallback={<Spiner />}>
            <TopIMDB />
          </Suspense>
        </section>
      </div>
    </div>
  );
};

export default Home;
