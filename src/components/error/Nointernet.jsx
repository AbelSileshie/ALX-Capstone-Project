import React from "react";
import { Typography, Button, IconButton } from "@material-tailwind/react";
import { FlagIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function Nointernet() {
  const Navigate = useNavigate();
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Connection Error It looks like something went wrong with your
          internet.
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Please try refreshing the page or come back later.
        </Typography>
        <IconButton
          color="gray"
          className="w-full px-4 md:w-[8rem]"
          onClick={() => Navigate("/")}
        >
          <HomeIcon className=" w-[2rem] h-[4rem]" />
        </IconButton>
      </div>
    </div>
  );
}
