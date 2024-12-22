"use client";

import "swiper/css";

import "swiper/css/navigation";

import "swiper/css/pagination";

import * as React from "react";

import { Navigation, Pagination } from "swiper/modules";

import {
  IconButton,
  Typography,
  Card,
  Button,
  Chip,
} from "@material-tailwind/react";

import {
  NavArrowRight,
  NavArrowLeft,
  StarSolid,
  HeartSolid,
} from "iconoir-react";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
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
  return (
    <div className="w-full object-cover">
      <Swiper
        pagination={{
          enabled: true,

          clickable: true,

          dynamicBullets: true,

          renderBullet: customPagination,
        }}
        modules={[Navigation, Pagination]}
        className="relative rounded-lg [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background"
      >
        {[
          "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D",

          "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D",

          "https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5hdHVyZXxlbnwwfDB8MHx8fDA%3D",

          "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D",

          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfDB8MHx8fDA%3D",
        ].map((img, index) => (
          <SwiperSlide key={index} className="relative select-none">
            <img
              src={img}
              alt={`image-${index}`}
              className="sm:h-[75vh] md:h-[32rem]  lg:h-[32rem] w-full object-cover"
            />
            <div className="absolute inset-0 bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="relative container mx-auto lg:px-2 sm:px-0 flex items-end p-1 justify-start h-full text-center text-white gap-5  bg-transparent ">
                <Card className="w-full max-w-[10rem] shadow-none bg-transparent border-none rounded-[2rem] p-1 sm:hidden lg:block md:block ">
                  <Card.Body className="relative overflow-hidden p-0 lg:h-[13rem] md:h-[13rem] sm:h-[15rem] shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      alt="ui/ux review check"
                      className="w-full h-full object-cover shadow-lg"
                    />

                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />

                    <IconButton
                      size="sm"
                      color="error"
                      variant="ghost"
                      className="!absolute right-2 top-2 rounded-full"
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
                      Wooden House Florida
                    </Typography>
                    <Typography className="flex items-center gap-1.5 ">
                      <StarSolid className="h-[18px] w-[18px] text-warning" />
                      5.0
                    </Typography>
                  </div>
                  <div className="p-5">
                    <Typography className="text-justify sm:text-sm md:text-base lg:text-lg  md:max-w-[20rem] lg:max-w-[35rem]">
                      Enter a freshly updated and thoughtfully furnished
                      peaceful home. Enter a freshly updated and thoughtfully
                      furnished peaceful home.
                    </Typography>
                    <div className="flex items-center gap-2">
                      <Chip isPill={false} variant="solid">
                        <Chip.Label>Adventure</Chip.Label>
                      </Chip>
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
  );
}
