"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";

// import "./styles.css";
const Carousel = () => {
  return (
    <>
      <Swiper
        className="mySwiper h-[645px]"
        modules={[Navigation, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 11000, disableOnInteraction: false }}
        // pagination={{ clickable: true }}
        loop={true}
      >
        <SwiperSlide>
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            suppressHydrationWarning
          >
            <source src="/pizza-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center space-y-4 bg-black bg-opacity-40">
            <h5 className="text-lg font-semibold font-open-sans">
              BEST IN TOWN
            </h5>
            <h1 className="text-4xl font-bold font-beyond">
              Pizza & Pasta
            </h1>

            <button className="px-4 py-2 mt-4 bg-red-500 rounded-md hover:bg-red-600">
              See Today's Menu
            </button>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
};

export default Carousel;
