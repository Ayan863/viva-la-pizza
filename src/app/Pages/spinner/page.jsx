"use client";

import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const SpinnerPage = () => {
  const data = [
    { option: "10%" },
    { option: "25%" },
    { option: "50%" },
    { option: "75%" },
    { option: "FREE!" },
    { option: "0%" },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState("");

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setSelectedPrize(data[prizeNumber].option); // Seçilen sonucu güncelle
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Spin to Win</h1>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={["#FF5F6D", "#FFC371"]}
        textColors={["#ffffff"]}
        onStopSpinning={handleStopSpinning}
      />
      <button
        onClick={handleSpinClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Spin
      </button>
      {selectedPrize && ( // Eğer bir sonuç varsa göster
        <div style={{ marginTop: "20px", fontSize: "18px", color: "#333" }}>
          <strong>Seçilen Faiz:</strong> {selectedPrize}
        </div>
      )}
    </div>
  );
};

export default SpinnerPage;
