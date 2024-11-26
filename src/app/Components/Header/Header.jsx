import { setActiveItem } from "@/app/redux/feature/menu/MenuSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaShoppingCart } from "react-icons/fa";

import Link from "next/link";
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.menu.activeItem);
  const menuItems = useSelector((state) => state.menu.value);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

  let data = {}; 
  const userData = localStorage.getItem("user");

  // localStorage verisini parse etmeden önce kontrol et
  if (userData && userData !== "undefined") {
    try {
      data = JSON.parse(userData); // Eğer geçerli bir veri varsa, parse et
    } catch (e) {
      console.error("Error parsing user data:", e); // Hata olursa logla
    }
  } 

  return (
    <header className="flex justify-center text-[#fff] font-['Oswald', Helvetica, sans-serif]">
      <div className="flex items-center w-[70%] justify-between">
        <img
          src="./vivaLaPizza.png"
          alt="viva-la-pizzaLogo"
          className="w-[125px] h-[88px]"
        />
        <ul className="flex gap-4 relative">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onMouseEnter={() => dispatch(setActiveItem(item.id))}
              onMouseLeave={() => dispatch(setActiveItem(null))}
              className="relative"
            >
              {item.title === "Home" ? (
                <Link href="/">{item.title}</Link>
              ) : item.title === "Services" ? (
                <Link href="../../Pages/menu">{item.title}</Link>
              ) : (
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
        <div className="icons flex gap-3 items-center">
          <div
            className="icons flex gap-3 relative items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaUser className="cursor-pointer" />

            {isUserMenuOpen && (
              <div className="userMenu absolute top-full mt-2 z-10 bg-white text-black rounded shadow-lg p-2">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 text-[15px] rounded">
                    <Link href="./../../Pages/wishlist">Wishlist</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 text-[15px] rounded">
                    Settings
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
          
          <div>
            <Link href="./../../Pages/basket"><FaShoppingCart /></Link>
          </div>
          <div>
            {userData ? <>{data.money}₼</> : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


