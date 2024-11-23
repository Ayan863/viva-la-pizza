import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const SpinnerPage = ({ onPrizeSelected }) => {
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

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const selectedPrize = data[prizeNumber].option;
    onPrizeSelected(selectedPrize); // Seçilen ödülü üst bileşene ilet
  };

  return (
    <div>
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
    </div>
  );
};

export default SpinnerPage;
