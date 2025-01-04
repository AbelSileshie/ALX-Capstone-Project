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
    <div className="flex flex-col p-0 mt-0 rounded-lg shadow-md mx-auto w-full">
      <section>
        <Suspense fallback={<Spiner />}>
          <div className="w-full">
            <Heroscetion />
          </div>
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<Spiner />}>
          <div className="w-full">
            <FeaturedToday />
          </div>
        </Suspense>
      </section>
      <section>
        <Suspense fallback={<Spiner />}>
          <div className="w-full">
            <TrendingMoviesCard />
          </div>
        </Suspense>
      </section>
      <section
        className={`bg-cover bg-center bg-no-repeat bg-gradient-to-tl from-black/30 via-transparent to-black/90 text-white`}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div>
          <Typography className="w-[20rem] bg-gradient-to-tl from-black/30 via-transparent to-black/10 text-xl text-black font-bold mb-4 p-3">
            Upcoming Movies
          </Typography>
        </div>
        <div className="w-full h-auto p-8 overflow-y-auto">
          <Suspense fallback={<Spiner />}>
            <Theatre />
          </Suspense>
        </div>
      </section>
      <section>
        <Suspense fallback={<Spiner />}>
          <div className="w-full">
            <TopIMDB />
          </div>
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
