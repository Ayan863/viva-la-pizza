"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import "./basket.css";
import toast from "react-hot-toast";
import SpinnerPage from "./../../Components/Spinner/Spinner";
import { Wheel } from "react-custom-roulette";

const Basket = () => {
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
    setSelectedPrize(selectedPrize);
  };
  const getNumericPrize = (prize) => {
    const numericValue = parseFloat(
      prize.replace("%", "").replace("FREE!", "100").replace("0%", "0")
    );
    return isNaN(numericValue) ? 0 : numericValue; // Geçersizse 0 döndür
  };

  const [cartItems, setCartItems] = useState([]);
  const [selectedPrize, setSelectedPrize] = useState(""); // Ödülü tutacak state
  const handlePrizeSelection = (prize) => {
    setSelectedPrize(prize); // SpinnerPage'den gelen ödülü al
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || { basket: [] };
    setCartItems(userData.basket || []);
  }, []);

  const updateUserStorage = (updatedBasket) => {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        basket: updatedBasket,
      })
    );
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    updateUserStorage(updatedItems);
    toast.success("Item is removed from th basket");
  };

  const updateQuantity = (id, quantityChange) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + quantityChange;
        const validQuantity = newQuantity > 0 ? newQuantity : 1;

        let unitPrice;
        if (Array.isArray(item.price)) {
          unitPrice = item.price[0];
        } else {
          unitPrice = item.price;
        }

        if (isNaN(unitPrice))  unitPrice = 0;

        const newTotal = (validQuantity * unitPrice).toFixed(2);

        return {
          ...item,
          quantity: validQuantity,
          total: newTotal,
        };
      }
      return item;
    });

    setCartItems(updatedItems);
    updateUserStorage(updatedItems);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const itemTotal = parseFloat(item.total) || 0;
    return total + itemTotal;
  }, 0);
  const formattedTotalPrice = totalPrice.toFixed(2);

  return (
    <div>
      <section className="basket-section">
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.total} AZN</p>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="delete-btn"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Səbət boşdur</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div>
              <div>
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={data}
                  backgroundColors={["#FF5F6D", "#FFC371"]}
                  textColors={["#ffffff"]}
                  onStopSpinning={handleStopSpinning} // Doğru fonksiyon burada olmalı
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
              </div>{" "}
            </div>
            <div className="cart-summary w-[100%]">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <p>Sale: {selectedPrize || "Please spin"}</p>
                <strong>Total</strong>
                <del className="line-through">{formattedTotalPrice}₼</del>
                <span>
                  {selectedPrize
                    ? `${(
                        formattedTotalPrice -
                        formattedTotalPrice *
                          getNumericPrize(selectedPrize) *
                          0.01
                      ).toFixed(2)}₼`
                    : null}
                </span>{" "}
              </div>
              <button className="checkout-btn">Order</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Basket;
