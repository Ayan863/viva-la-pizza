"use client";
import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./haqqimizda.css";
import Smallintro from "../../Components/Smallintro/Smallintro";

const Haqqimizda = () => {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  return (
    <>
      <Header />
      <div>
      <div className="about-welcome">
        <Smallintro
          text={["Welcome to Viva La Pizza"]}
          image={[
            "https://pizza.az/upload/iblock/a4f/a4f20aa25ee40582db412e8b36db5321.jpg",
          ]}
        />
      </div>
      <div className="about-text2 mx-auto px-6 py-12">
  <h2 className="pa-h2 text-4xl font-extrabold text-center text-gray-800 mb-6">
    About Us
  </h2>
  <p className="hp-p1 text-lg text-gray-700 leading-relaxed mb-6">
    At Viva La Pizza, we believe that every slice tells a story—a story
    of fresh ingredients, time-honored recipes, and a passion for
    delivering the perfect pizza experience. Founded with the vision of
    bringing authentic Italian flavors to your table, we pride ourselves
    on using only the finest ingredients. From hand-tossed dough made
    fresh daily to our signature sauces and premium toppings, every
    pizza is crafted with love and care.
  </p>
  <p className="hp-p2 text-lg text-gray-700 leading-relaxed">
    Our mission is simple: to share the joy of pizza with our community.
    Whether you're dining in with family, celebrating a special
    occasion, or enjoying a quick bite, we strive to make every moment
    memorable. Thank you for choosing Viva La Pizza. Together, let's
    create delicious memories, one slice at a time!
  </p>
</div>

      <div className="about-main">
        <div className="about-videoo">
          <video
            className="video w-full h-full object-cover"
            autoPlay
            loop
            muted
            poster="/pizza-video-placeholder.jpg"
          >
            <source src="/pizza-video.mp4" type="video/mp4" />
          </video>
        </div>

        
        <div className="about-picture">
          <img
          className="object-cover"
            src="https://pizza.az/upload/iblock/cd2/cd213e6cb1c83918a649ab9343db3a88.jpg"
            alt="Picture 1"
          />
          <img
          className="object-cover"
            src="https://pizza.az/upload/iblock/cd2/cd213e6cb1c83918a649ab9343db3a88.jpg"
            alt="Picture 2"
          />
          <img
          className="object-cover"
            src="https://pizza.az/upload/iblock/be4/be490d36a7478c90ad4b19baee796ffc.jpg"
            alt="Picture 3"
          />
        </div>
      </div>
      </div>
      <Footer />
    </>
  )
};

export default Haqqimizda;
