"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";

// import "./styles.css";
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
            <h1 className="text-4xl font-bold font-beyond">Pizza & Pasta</h1>
            <button className="px-4 py-2 mt-4 bg-red-500 rounded-md hover:bg-red-600 flex items-center gap-1">
            <MdOutlineMenuBook /> Today's Menu
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://dominospizza.az/static/media/create-your-own-banner.77d7e725.webp"
            alt="make your own pizza"
            className="h-[650px] relative"
          />
          <div className="absolute inset-0 flex flex-col items-end justify-center text-right p-6 bg-gray-900 bg-opacity-50 text-white rounded-lg">
            <h5 className="text-lg font-semibold font-open-sans">
              MAKE YOUR OWN PIZZA
            </h5>
            <button className="flex items-center px-4 py-2 mt-4 bg-red-500 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
              <MdOutlineRestaurantMenu className="mr-2 text-xl" /> MAKE NOW
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="all flex">
            <img
              src="https://dominospizza.az/static/media/earn-coins.9011d4f3.webp"
              alt="order online"
              className="h-[650px]"
            />
            <div className="text-end max-w-lg mx-auto flex flex-col items-end justify-center">
              <h4 className="text-xl font-semibold text-red-500 mb-2">
                REWARDS
              </h4>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                EARN POINTS EVERY TIME YOU ORDER ONLINE
              </h2>
              <p className="text-gray-600 mb-6">
                Great offer for pizza shoppers. Earn Domino's Pizza 'Reward
                points' and translate them into unbelievable deals and
                discounts. Hurry up, and grab your 'reward points' now.
              </p>
              <button className="px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-300 flex gap-1 items-center">
                <FaShoppingCart /> ORDER NOW
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
