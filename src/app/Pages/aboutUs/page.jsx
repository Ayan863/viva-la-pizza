"use client"
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
      <div className="about-main">
        <div className="about-welcome">
        <Smallintro text={["Mercedes-Benz Azərbaycana xoş gəldiniz"]} image={["https://d2638j3z8ek976.cloudfront.net/global-css-files/20241021-114056/images/placeholders/XeG191GlSB.jpg"]}/>
        
        </div>
        <div className="about-text2">
          <h2 className="pa-h2">Haqqımızda</h2>
          <p className="hp-p1">
            “Avtokapital-Azərbaycan” MMC – Mercedes-Benz Group AG-nin
            Mercedes-Benz markalı avtomobilləri üzrə Azərbaycandakı Rəsmi
            Nümayəndəliyi.
          </p>
          <p className="hp-p2">
            Bizim məqsədimiz – şirkətin müştərilərinə qayğı göstərmək, ən yüksək
            səviyyəli xidməti təmin etmək, habelə şirkətə istedadlı
            mütəxəssisləri cəlb etmək, müştərilərin maraqlarına uyğun olaraq,
            kollektiv yaradıcılıq potensialının həyata keçirilməsinə imkan
            yaratmaq.
          </p>
        </div>
        <div className="about-picture">
          <img
            src="https://images.netdirector.co.uk/gforces-auto/image/upload/w_410,h_273,q_auto,c_fill,f_auto,fl_lossy/auto-client/ab06f500c60f00c40c6ba64979088acd/step_1x1x.jpg"
            alt="Picture 1"
          />
          <img
            src="https://images.netdirector.co.uk/gforces-auto/image/upload/w_410,h_273,q_auto,c_fill,f_auto,fl_lossy/auto-client/aa68160eecd71899719e41d2be62b61c/step_3_1x1.jpg"
            alt="Picture 2"
          />
          <img
            src="https://images.netdirector.co.uk/gforces-auto/image/upload/w_410,h_273,q_auto,c_fill,f_auto,fl_lossy/auto-client/3d87344ed98cef5ea497373769528c26/general_jump.jpg"
            alt="Picture 3"
          />
        </div>
        <div className="about-video">
          {!isVideoPlaying ? (
            <>
              <img
                className="about-video-thumbnail"
                src="https://images.netdirector.co.uk/gforces-auto/image/upload/w_1269,h_423,q_auto,c_fill,f_auto,fl_lossy/auto-client/d04ce17289e0e4c70dff9be7685717af/buy_online.jpg"
                alt="Video Thumbnail"
              />
              <div
                className="about-play-button"
                onClick={() => setIsVideoPlaying(true)}
              >
                ▶
              </div>
            </>
          ) : (
            <iframe
              className="about-video-frame"
              src="https://www.youtube.com/embed/nV1MIqp81fY"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Haqqimizda;
