import React from "react";
import "./Smallintro.css";

const Smallintro = ({ image, text }) => {
  return (
    <div className="smallintro">
      <img src={image} alt="Intro Image" className="smallintro-image" />
      <div className="smallintro-text">{text}</div>
    </div>
  );
};

export default Smallintro;
