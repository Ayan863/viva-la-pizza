"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import "./carousel.css";
const Carousel = () => {
  return (
    <>
      <Swiper
        className="mySwiper h-[645px]"
        modules={[Navigation, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        speed={1500}
        autoplay={{ delay: 11000, disableOnInteraction: false }}
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

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black bg-opacity-40 gap-11">
            <h5 className="text-lg font-semibold font-open-sans">
              BEST IN TOWN
            </h5>
            <h1 className="text-4xl font-bold font-beyond">Pizza & Pasta</h1>
            
            <button className="px-8 py-4 bg-red-600 text-white font-medium rounded-2xl hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg">
        <FaShoppingCart /> Today's Menu
      </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/slider-02-1903x900.jpg"
            alt="pizza"
            className="h-[650px] w-[100%]"
          />
        </SwiperSlide>
        <SwiperSlide>
        <div className="all bg-[url('https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/parallax-bg.jpg')] h-[650px] bg-cover bg-center">
  <div className="flex justify-end w-[85%] items-center h-full px-8 text-right">
    <div className="max-w-lg text-white p-8 backdrop-blur-lg bg-black/50 rounded-3xl shadow-lg w-[400px]">
      <h4 className="text-xl font-semibold text-red-500 mb-3 uppercase tracking-wide text-start">
        REWARDS
      </h4>
      <h2 className="text-4xl font-bold mb-6 leading-tight text-start">
        Every Points Every Time You Order Online
      </h2>
      <p className="mb-8 text-lg font-light text-start ">
        Great offer for pizza lovers. Earn Viva La Pizza's Pizza 'Reward points' and turn them into amazing deals and discounts. Hurry up, and grab your 'reward points' now.
      </p>
      <button className="px-8 py-4 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg">
        <FaShoppingCart /> ORDER NOW
      </button>
    </div>
  </div>
</div>


        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
