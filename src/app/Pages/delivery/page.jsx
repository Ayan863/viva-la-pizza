"use client";
import { useRouter } from "next/navigation";
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
import axios from "axios";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
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
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(10);
  const [randomTime, setRandomTime] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [randomSelected, setRandomSelected] = useState(false);
  const [text, setText] = React.useState("");
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);
  const [userData, setUserData] = useState(null);
  const [ordersData, setOrdersData] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0);
  const [formData, setFormData] = useState({
    detailedAddress: "",
    phoneNumber: "",
    location: null,
  });
  const [textContent, setTextContent] = useState("");
  const [valueContent, setValueContent] = useState(null);
  const [hoverContent, setHoverContent] = useState(-1);

  const addEmojiContent = (emoji) => () => {
    setText((prev) => prev + emoji);
  };
 
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
      data.location !== null; 
    setIsButtonDisabled(!allFieldsFilled);
  };

  const handleMapSelection = (location) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, location };
      validateForm(updatedData);
      return updatedData;
    });
  };
  const handleAddContent = () => {
    const userData = localStorage.getItem("user");
    const updatedData = JSON.parse(userData) || {};
    const ordersData = updatedData.orders || [];
    console.log("updatedData", updatedData);
    
    updatedData.delivery = {
      content: text,
      rating: value,
      location: formData.detailedAddress,
      phoneNumber: formData.phoneNumber, 
      name: updatedData.name || "Default Name",
      totalDuration: randomTime,
      ordersData,
    };
    updatedData.orders = [];
    
    localStorage.setItem("user", JSON.stringify(updatedData));
    setOrdersData(updatedData.orders )
    console.log("ordersData", ordersData);
  
    axios
      .put(`https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${updatedData.id}`, updatedData)
      .then((response) => {
        console.log("First API Response:", response.data);
        toast.success("Data successfully updated");
  
        return axios.post("https://66eba56d2b6cf2b89c5b2e2d.mockapi.io/Delivery", updatedData.delivery);
      })
      .then((deliveryResponse) => {
        console.log("Second API Response:", deliveryResponse.data);
        toast.success("Delivery data successfully added!");
        router.push('/');
      })
      .catch((error) => {
        console.error("Error occurred:", error);
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
  }, [isTimerActive, timeLeft]);

  const handleTimeEnd = () => {
    setTimeout(() => {
      if (randomTime > 30 * 60) {
        toast.error("Sorry, delivery is delayed.");
        setShowContent(false);
        setTimeLeft(randomTime - 150);
      } else {
        toast.success("Your delivery is on time! Enjoy your meal.");
        setIsTimerActive(false);
        setShowContent(true);
      }
    }, 2000);
  };

  if (!userData) {
    return <p>Loading...</p>;
  }
  const groupedItems = userData.orders
    .flatMap((orders) => orders.items)
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
    <>
    <Header/>
    <section className="delivery">
      <Toaster />
      <div
        style={{
          maxWidth: "650px",
          margin: "50px auto",
          padding: "20px",
          backgroundColor: "#fff",
          // borderRadius: "8px",
          // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6">Pizza Delivery</h2>
        <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-[600px] p-4 bg-white shadow-md rounded-md">
                <div className="">
          <div className="personal info ">
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
                  <p><strong>Total:</strong>{userData.orders[0].spent}</p>
                </div>
              </div>
            </div>
            <div>
              <p>
                <strong>Name:</strong> {userData.name}
              </p><p>
                <strong>Gmail:</strong> {userData.email}
              </p>
              <p>
                <label className="flex">
                  <strong>Phone Number:</strong>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 p-1 border rounded-md"
                  />
                </label>
              </p>
              
              <div>
                <label className="flex items-center">
                <strong>Detailed Address:</strong>
                  <input
                    type="text"
                    name="detailedAddress"
                    value={formData.detailedAddress}
                    onChange={handleInputChange}
                    className="mt-1 p-1 border rounded-md"
                  />
                </label>
              </div>
              <div className="h-auto">
                <Map onLocationSelect={handleMapSelection} />
              </div>
            </div>
            <p>-</p>

            <button
              disabled={isButtonDisabled}
              onClick={handleButtonClick}
              style={{ marginTop: "20px", display: "block" }}
              className={`mt-6 px-4 py-2 bg-gray-300 text-white rounded-md ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
              }`}
            >
              Submit
            </button>
          </div>

          {isTimerActive && (
            <div className="time-remaining flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Time Remaining</h3>
              {isTimerActive && (
                <div className="timer">
                  <p>Your order is being processed...</p>
                  {/* Timer logic goes here */}
                </div>
              )}

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
            </div>
          )}
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
              sx={{ minWidth: 200 }}
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
              <div></div>
            </Boxx>
              <button onClick={handleAddContent}
                      className="ml-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-green-600"

              >Add Content</button>
          </div>
        )}
        </div>
      </div>
    </section>
    <Footer/>
    
    </>
  );
}
