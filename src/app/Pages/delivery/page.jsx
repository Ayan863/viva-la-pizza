"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../../Components/Map/Map"));
import * as React from "react";
import Box from "@mui/joy/Box";
import toast, { Toaster } from "react-hot-toast";

import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Boxx from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import "./delivery.css";
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function Delivery() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [randomTime, setRandomTime] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [randomSelected, setRandomSelected] = useState(false);
  const [text, setText] = React.useState("");
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);
  const [userData, setUserData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    detailedAddress: "",
    phoneNumber: "",
    location: null,
  });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      validateForm(updatedData);
      return updatedData;
    });
  };

  const validateForm = (data) => {
    const allFieldsFilled =
      data.detailedAddress.trim() &&
      data.phoneNumber.trim() &&
      data.location !== null; // Ensure location is selected
    setIsButtonDisabled(!allFieldsFilled);
  };

  const handleMapSelection = (location) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, location };
      validateForm(updatedData);
      return updatedData;
    });
  };
  useEffect(() => {
    const allFieldsFilled =
      formData.detailedAddress.trim() && formData.phoneNumber.trim();
    setIsButtonDisabled(!allFieldsFilled);
  }, [formData]);
  useEffect(() => {
    if (!randomSelected) {
      const randomValue = Math.floor(Math.random() * (10 * 60));
      setRandomTime(randomValue);
      setTimeLeft(randomValue);
      setRandomSelected(true);
      console.log("Random value selected: ", randomValue);
    }
  }, [randomSelected]);

  const handleButtonClick = () => {
    if (isButtonDisabled) {
      toast.error("Please fill all the fields before proceeding!");
    } else {
      setIsTimerActive(true);
      toast.success("Order processing started!");

      
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
      const total = user.basket.reduce(
        (acc, item) => acc + parseFloat(item.price || 0),
        0
      );
      setTotalAmount(total.toFixed(2));
    }
  }, []);
  useEffect(() => {
    if (!randomSelected) {
      const randomValue = Math.floor(Math.random() * (10 * 60));
      setRandomTime(randomValue);
      setRandomSelected(true);
      console.log("Random value selected: ", randomValue);
    }
  }, [randomSelected]);
  useEffect(() => {
    let interval;

    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            handleTimeEnd();
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft])

  const handleTimeEnd = () => {
    console.log("Handle Time End: ", randomTime);

    setTimeout(() => {
      if (randomTime > 30 * 60) {
        toast.error("Sorry, delivery is delayed.");
        setShowContent(false);
        setTimeLeft(randomTime - 150);
      } else {
        toast.success("Your delivery is on time! Enjoy your meal.");
        setIsTimerActive(false)
        setShowContent(true);
      }
    }, 2000);
  };
  if (!userData) {
    return <p>Loading...</p>;
  }
  const groupedItems = userData.orders
  .flatMap((order) => order.items)
  .reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item.name);
    return acc;
  }, {});
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (timeLeft / (30 * 60)) * circumference;

  return (
    <section className="delivery">
      <Toaster />

      <div
        style={{
          maxWidth: "600px",
          margin: "50px auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Pizza Delivery</h2>

        <div className="flex">
          <div className="personal info">
            <div>
              
              <div>
                <div>
                {groupedItems.pizza && (
  <p>
    <strong>Pizza:</strong> {groupedItems.pizza.join(" ")}
  </p>
)}
{groupedItems.drinks && (
  <p>
    <strong>Drinks:</strong> {groupedItems.drinks.join(" ")}
  </p>
)}
{groupedItems.sous && (
  <p>
    <strong>Sous:</strong> {groupedItems.sous.join(" ")}
  </p>
)}
                </div>
              </div>
            </div>
            <div>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <label>
                  <strong>Phone Number:</strong>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </label>
              </p>
              <p>
                <strong>Gmail:</strong> {userData.email}
              </p>
              <div>
                <label className="flex">
                  Detailed Address:
                  <input
                    type="text"
                    name="detailedAddress"
                    value={formData.detailedAddress}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="h-auto">

              <Map onLocationSelect={handleMapSelection}  />
              </div>
            </div>
            <p>-</p>

            <button 
            disabled={isButtonDisabled}
          onClick={handleButtonClick}
          style={{ marginTop: "20px", display: "block" }}>Submit</button>
          </div>

          {isTimerActive && <div className="time-remaining">
            <button
              onClick={handleButtonClick}
              disabled={isButtonDisabled}
              className={`submit-button ${isButtonDisabled ? "disabled" : ""}`}
            >
              Start Timer
            </button>
            {isTimerActive && (
              <div className="timer">
                <p>Timer is active! Your order is being processed...</p>
                {/* Timer logic goes here */}
              </div>
            )}
            <h3>Delivery Time Remaining</h3>

            <div
              style={{
                position: "relative",
                width: "200px",
                height: "200px",
                margin: "0 auto",
              }}
            >
              <svg
                width="200"
                height="200"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  stroke="#e6e6e6"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  stroke="#4caf50"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 50}
                  strokeDashoffset={
                    2 * Math.PI * 50 -
                    (timeLeft / (30 * 60)) * (2 * Math.PI * 50)
                  }
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "20px",
                }}
              >
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
            </div>
          </div>}
        </div>
        {showContent && (
          <div>
            <h3>Additional Content</h3>
            <p>Your delivery is on time! Enjoy your meal!</p>
            <Textarea
              placeholder="Type in here…"
              value={text}
              onChange={(event) => setText(event.target.value)}
              minRows={2}
              maxRows={4}
              startDecorator={
                <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("👍")}
                  >
                    👍
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("🏖")}
                  >
                    🏖
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("😍")}
                  >
                    😍
                  </IconButton>
                  <Button
                    variant="outlined"
                    color="neutral"
                    sx={{ ml: "auto" }}
                  >
                    See all
                  </Button>
                </Box>
              }
              endDecorator={
                <Typography level="body-xs" sx={{ ml: "auto" }}>
                  {text.length} character(s)
                </Typography>
              }
              sx={{ minWidth: 300 }}
            />
            <Boxx sx={{ width: 200, display: "flex", alignItems: "center" }}>
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {value !== null && (
                <Boxx sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : value]}
                </Boxx>
              )}
              <button>Add Content</button>
            </Boxx>
          </div>
        )}
      </div>
    </section>
  );
}
