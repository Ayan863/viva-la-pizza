"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import "./basket.css";
import toast from "react-hot-toast";
import { Wheel } from "react-custom-roulette";
import axios from "axios";
import Link from "next/link";

const Basket = () => {
  const data = [
    { option: "10%" },
    { option: "25%" },
    { option: "50%" },
    { option: "75%" },
    { option: "FREE!" },
    { option: "0%" },
  ];
  const router = useRouter(); // useRouter hook'unu kullan

  const [hasSpun, setHasSpun] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || { basket: [] };
    setCartItems(userData.basket || []);
  }, []);

  const getNumericPrize = (prize) => {
    const numericValue = parseFloat(
      prize.replace("%", "").replace("FREE!", "100").replace("0%", "0")
    );
    return isNaN(numericValue) ? 0 : numericValue;
  };
  const handleStopSpinning = () => {
    setMustSpin(false);
    const selectedPrize = data[prizeNumber].option;
    setSelectedPrize(selectedPrize);

    const numericPrize = getNumericPrize(selectedPrize);
    const discountedTotal = (
      totalPrice -
      totalPrice * (numericPrize * 0.01)
    ).toFixed(2);
    setDiscountedTotal(discountedTotal);

    toast.success(`Order accepted!`);
    toast.success(
      `Discounted amount: ${discountedTotal}₼ Your balance: ${(
        JSON.parse(localStorage.getItem("user")).money - discountedTotal
      ).toFixed(2)}`
    );
    setCartItems([]);
    updateUserStorage([]);
    setIsOrderPlaced(true);
  };

  const [cartItems, setCartItems] = useState([]);
  const [selectedPrize, setSelectedPrize] = useState("");
  const handlePrizeSelection = (prize) => {
    setSelectedPrize(prize);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")) || { basket: [] };
    setCartItems(userData.basket || []);
  }, []);

  const updateUserStorage = (updatedBasket) => {
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUserData = {
      ...userData,
      basket: updatedBasket,
    };
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    const parsedUser = JSON.parse(localStorage.getItem("user")) || {};

    axios
      .put(
        `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
        updatedUserData
      )
      .then((response) => {
        console.log("User data successfully updated on the server:", response);
      })
      .catch((error) => {
        console.error("Error updating user data on the server:", error);
      });
  };
  const handleOrderClick = () => {
    const userData = JSON.parse(localStorage.getItem("user")) || { money: 0 };
    const userBalance = parseFloat(userData.money) || 0;
    const discountedTotal = selectedPrize
      ? formattedTotalPrice -
        formattedTotalPrice * getNumericPrize(selectedPrize) * 0.01
      : formattedTotalPrice;

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    let percent = newPrizeNumber;
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);

    if (userBalance >= discountedTotal) {
      setTimeout(() => {
        setCartItems((prevCart) =>
          prevCart.map((item) => ({ ...item, isFadingOut: true }))
        );

        setTimeout(() => {
          console.log("log", newPrizeNumber);
          console.log(
            "consol",
            (
              userBalance -
              (discountedTotal - newPrizeNumber * percent * 0.01)
            ).toFixed(2)
          );
          const updatedBalance = (
            userBalance -
            (discountedTotal - newPrizeNumber * discountedTotal * 0.01)
          ).toFixed(2);
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userData,
              money: updatedBalance,
              orders: [...(userData.orders || []), ...cartItems],
            })
          );
          const parsedUser = JSON.parse(localStorage.getItem("user"));
          axios
            .put(
              `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
              {
                money: updatedBalance,
                orders: [...(userData.orders || []), ...cartItems],
              }
            )
            .then((response) => {
              console.log("User data updated in API:", response.data);
            })
            .catch((error) => {
              console.error("Error updating user data:", error);
            });

          setCartItems([]);
          updateUserStorage([]);
          setSelectedPrize("");
          toast.success("Order successfully placed!");
          router.push("./../../Pages/delivery"); 
        }, 10000);
      }, 20000);
    } else {
      toast.error("Insufficient balance! Please top up your account.");
    }
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

        if (isNaN(unitPrice)) unitPrice = 0;

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
  useEffect(() => {
    const hasSpunBefore = JSON.parse(localStorage.getItem("hasSpun")) || false;
    setHasSpun(hasSpunBefore);
  }, []);

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
                    <p>{item.total}₼</p>
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
              <>
                {" "}
                <p>There is no items in your basket.</p>
                <Link href="./menu">
                  <button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md transition duration-300">
                    Go Menu
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div>
              <div>
                <Wheel
                  mustStartSpinning={mustSpin}
                  prizeNumber={prizeNumber}
                  data={data}
                  textColors={["#ffffff"]}
                  onStopSpinning={handleStopSpinning}
                  strokeWidth={0}
                  shadowColor="none" /* Əgər mövcuddursa */
                  outerBorderColor={["#ccc"]}
                  outerBorderWidth={[0]}
                  innerBorderColor={["#f2f2f2"]}
                  radiusLineColor={["tranparent"]}
                  radiusLineWidth={[1]}
                  backgroundColors={[
                    "#169ed8", // Sky Blue (Açıq Mavi)
                    "#64b031", // Lime Green (Açıq Yaşıl)
                    "#e5177b", // Pink (Çəhrayı)
                    "#871f7f", // Dark Purple (Tünd Bənövşəyi)
                    "#dc0936", // Red (Qırmızı)
                    "#3f297e", // Dark Blue (Tünd Mavi)
                    "#e6471d", // Red Orange (Qırmızı Narıncı)
                  ]}
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    border: "none",
                    margin: 0,
                    padding: 0,
                  }}
                />
              </div>
            </div>
            <div className="cart-summary w-[100%]">
              <h3>Order Summary</h3>
              <div className="summary-details">
                <p>Sale: {selectedPrize || "Please spin"}</p>
                <strong>Total</strong>
                <del className={selectedPrize ? "line-through" : ""}>
                  {formattedTotalPrice}₼
                </del>
                <span>
                  {selectedPrize
                    ? `${(
                        formattedTotalPrice -
                        formattedTotalPrice *
                          getNumericPrize(selectedPrize) *
                          0.01
                      ).toFixed(2)}₼`
                    : null}
                </span>
                <span>
                  {selectedPrize
                    ? `${(
                        formattedTotalPrice -
                        formattedTotalPrice *
                          getNumericPrize(selectedPrize) *
                          0.01
                      ).toFixed(2)}₼`
                    : null}
                </span>
                {selectedPrize && (
                  <p>
                    Discounted amount: {discountedTotal}₼
                    <br />
                    Your balance:{" "}
                    {(
                      JSON.parse(localStorage.getItem("user")).money -
                      discountedTotal
                    ).toFixed(2)}
                    ₼
                  </p>
                )}
              </div>
              <button
                className="checkout-btn"
                onClick={handleOrderClick}
                disabled={mustSpin || isOrderPlaced}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Basket;
