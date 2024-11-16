import { setActiveItem } from "@/app/redux/feature/menu/MenuSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import "./header.css";

const Header = () => {
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.menu.activeItem);
  const menuItems = useSelector((state) => state.menu.value);

  return (
    <header className='flex justify-center text-[#fff] font-["Oswald", Helvetica, sans-serif] '>
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
              ) : item.title === "Menu" ? (
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
        <div className="icons flex gap-3">
          <FaUser />
          <FaShoppingCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
