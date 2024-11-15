import { setActiveItem } from '@/app/redux/feature/menu/MenuSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import "./header.css"
const Header = () => {
    const dispatch = useDispatch();
    const activeItem = useSelector((state) => state.menu.activeItem);
    const menuItems = useSelector((state) => state.menu.value);

    return (
        <header className='flex  justify-center  text-[#fff] font-["Oswald", Helvetica, sans-serif] shadow-lg shadow-cyan-500/50'>
            <div className=' flex items-center w-[70%] justify-between'>
            <img src="./vivaLaPizza.png" alt="viva-la-pizzaLogo" className='w-[125px] h-[88px]' />
            <ul className='flex gap-4 ' >
                {menuItems.map((item) => (
                    <li
                        
                        key={item.id}
                        onMouseEnter={() => dispatch(setActiveItem(item.id))}
                        onMouseLeave={() => dispatch(setActiveItem(null))}
                    >
                        <a href="">{item.title}</a>
                        {activeItem === item.id && item.items && (
                            <div className='menuItems'>
                                <ul className="absolute">
                                    {item.items.map((subItem, index) => (
                                        <li key={index} >{subItem}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="icons flex gap-3">
            <FaUser />
            <FaShoppingCart/>
            </div>
            </div>
        </header>
    );
}

export default Header;
