"use client";
import { setActiveItem } from "@/app/redux/feature/menu/MenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaShoppingCart } from "react-icons/fa";

import Link from "next/link";
import "./header.css";
import axios from "axios";
import Badge from "@mui/joy/Badge";
import React from "react";

const Header = () => {
  const dispatch = useDispatch();
  const [basketItems, setBasketItems] = React.useState([]);
  const [isBasketMenuOpen, setIsBasketMenuOpen] = React.useState(false);
  const activeItem = useSelector((state) => state.menu.activeItem);
  const menuItems = useSelector((state) => state.menu.value);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [basketCount, setBasketCount] = React.useState(0);
  const getBasketCount = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const basket = user.basket || [];
    return basket.length;
  };

  React.useEffect(() => {
    setBasketCount(getBasketCount());

    const interval = setInterval(() => {
      setBasketCount(getBasketCount());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  let hoverTimeout;

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsUserMenuOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 200);
  };
  const handleBasketMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsBasketMenuOpen(false);
    }, 100);
  };

  const handleBasketMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsBasketMenuOpen(true);
  };
  const userData = localStorage.getItem("user");
  React.useEffect(() => {
    if (userData && userData !== "undefined") {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.basket) {
          setBasketItems(parsedData.basket);
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, [userData]);

  let data = {};
  if (userData && userData !== "undefined") {
    try {
      data = JSON.parse(userData);
    } catch (e) {
      console.error("Error parsing user data:", e);
    }
  }
  const incrementQuantity = async (index) => {
    try {
      const updatedItems = [...basketItems];
      updatedItems[index].quantity += 1;
      setBasketItems(updatedItems);

      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.basket) {
        user.basket = updatedItems;
        localStorage.setItem("user", JSON.stringify(user));
      }

      const apiUrl = `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${user.id}`;
      await axios.put(apiUrl, {
        basket: updatedItems,
      });

      console.log("Basket successfully updated on API!");
    } catch (error) {
      console.error("Error updating basket:", error);
    }
  };

  const decrementQuantity = async (index) => {
    try {
      const updatedItems = [...basketItems];
      if (updatedItems[index].quantity > 1) {
        updatedItems[index].quantity -= 1;
        setBasketItems(updatedItems);

        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.basket) {
          user.basket = updatedItems;
          localStorage.setItem("user", JSON.stringify(user));
        }

        const apiUrl = `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${user.id}`;
        await axios.put(apiUrl, {
          basket: updatedItems,
        });

        console.log("Basket successfully updated on API!");
      }
    } catch (error) {
      console.error("Error updating basket:", error);
    }
  };

  return (
    <header className="flex justify-center text-[#fff] font-['Oswald', Helvetica, sans-serif] relative">
      <div className="container flex items-center w-[70%] justify-between">
        <img
          src="./vivaLaPizza.png"
          alt="viva-la-pizzaLogo"
          className="w-[125px] h-[88px]"
        />
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Menü durumu değiştir
            className="text-white"
          >
            <div className="space-y-2">
              <span className="block w-8 h-1 bg-white"></span>
              <span className="block w-8 h-1 bg-white"></span>
              <span className="block w-8 h-1 bg-white"></span>
            </div>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "absolute" : "hidden"
          } md:flex md:relative bg-white flex-col md:flex-row bg-[url("https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/catalog/view/theme/OPCTM013/stylesheet/TemplateTrip/images/footer-bg.jpg")] md:bg-transparent w-full md:w-auto md:top-0 top-[100%] left-0 z-10`}
        >
          <ul className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 md:p-0">
            {menuItems.map((item) => (
              <li key={item.id} className="relative">
                {item.title === "Home" ? (
                  <Link href="/">{item.title}</Link>
                ) : item.title === "Services" ? (
                  <Link href="../../Pages/menu">{item.title}</Link>
                ) : item.title === "About Us" ? (
                  <Link href="../../Pages/aboutUs">{item.title}</Link>
                ): item.title === "Order history" ? (
                  <Link href="../../Pages/orderHistory">{item.title}</Link>
                )
                
                : (
                  <a href="#">{item.title}</a>
                )}

                {activeItem === item.id && item.items && (
                  <div className="menuItems absolute bg-white text-black rounded shadow-lg">
                    <ul>
                      {item.items.map((subItem, index) => (
                        <li key={index} className="px-4 py-2 hover:bg-gray-200">
                          {subItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="icons flex gap-3 items-center">
          <div
            className="icons flex gap-3 relative items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              {data.img ? (
                <img
                  src={data.img}
                  alt="profile"
                  className="w-[25px] rounded-full"
                />
              ) : (
                <FaUser className="cursor-pointer" />
              )}
            </div>

            {isUserMenuOpen && (
              <div className="userMenu absolute top-full mt-2 z-10 bg-white text-black rounded shadow-lg p-2">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 text-[15px] rounded">
                    <Link href="./">Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 text-[15px] rounded">
                    <Link href="./../../Pages/wishlist">Wishlist</Link>
                  </li>

                  {userData ? (
                    <li className="text-[15px]">
                      <Link
                        className="hover:bg-gray-200 flex px-4 py-2 rounded"
                        href="#"
                        onClick={() => localStorage.clear()}
                      >
                        Log out
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li className="text-[15px]">
                        <Link
                          className="hover:bg-gray-200 flex px-4 py-2 rounded"
                          href="../../Pages/login"
                        >
                          Login
                        </Link>
                      </li>
                      <li className="text-[15px] ">
                        <Link
                          className="hover:bg-gray-200 flex px-4 py-2 rounded"
                          href="../../Pages/signup"
                        >
                          Signup
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="icons flex gap-3 items-center">
            <div
              className="icons flex gap-3 relative items-center justify-center"
              onMouseEnter={handleBasketMouseEnter}
              onMouseLeave={handleBasketMouseLeave}
            >
              <Link href="./../../Pages/basket">
                <Badge
                  badgeContent={basketCount}
                  variant="solid"
                  color="danger"
                  size="sm"
                >
                  <FaShoppingCart className="cursor-pointer" />
                </Badge>
              </Link>
              {isBasketMenuOpen && (
                <div className="userMenu absolute top-full mt-2 z-10 bg-white text-black rounded shadow-lg p-2">
                  {basketItems.length > 0 ? (
                    <>
                      <ul>
                        {basketItems.map((item, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-200 text-[15px] rounded flex justify-between items-center"
                          >
                            <div className="flex icons gap-3 relative items-center justify-center">
                              <div className="flex-1 w-[50px]">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-[40px] h-[40px] rounded-full"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => decrementQuantity(index)}
                                  className="bg-gray-300 px-2 py-1 rounded"
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  onClick={() => incrementQuantity(index)}
                                  className="bg-gray-300 px-2 py-1 rounded"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 text-center">
                        <Link
                          href="./../../Pages/basket"
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                          Go Basket Page
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p className="text-[14px] text-center">Basket is empty</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div></div>

          <div className="hidden sm:block">
{userData ? <>{data.money}₼</> : null}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
