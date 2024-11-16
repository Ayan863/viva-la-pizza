import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

import "./footer.css";
const Footer = () => {
  return (
    <footer className="p-4">
      <div className="nav text-white flex gap-2 justify-center p-3">
        <a href="#">About us</a>
        {">"}
        <a href="#">Delivery Information</a>
        {">"}
        <a href="#">Privacy Policy</a>
        {">"}
        <a href="#">Gift Certificates</a>
      </div>
      <div className="flex justify-center w-full p-3 items-center">
        <div className="flex justify-between w-[50%]">
          <div className="images flex flex-col gap-2 ">
            <div className="firstL flex gap-2">
              <img
                src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/5-home-default-870x564.jpg"
                alt=""
                className="w-[100px] h-[100px]"
              />
              <img
                src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/4-home-default-870x564.jpg"
                alt=""
                className="w-[100px] h-[100px]"
              />
              <img
                src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/3-home-default-870x564.jpg"
                alt=""
                className="w-[100px] h-[100px]"
              />
            </div>
            <div className="secondL flex gap-2">
              <img
                src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/2-home-default-870x564.jpg"
                alt=""
                className="w-[100px] h-[100px]"
              />
              <img
                src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/1-home-default-870x564.jpg"
                alt=""
                className="w-[100px] h-[100px]"
              />
              <img
                src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/gallery-img-05.jpg"
                alt=""
                className="w-[100px] h-[100px]"
              />
            </div>
          </div>

          <div className="info text-white flex flex-col gap-3">
            <h4>STORE INFORMATION</h4>
            <div className="flex flex-col gap-2">
            <div className="loc flex gap-2">
              <FaLocationDot className="w-[25px] h-[25px]" />
              <p>Viva La Pizza</p>
            </div>
            <div className="mail flex gap-2">
            <IoIosMail className="w-[25px] h-[25px]" />

              <a href="#" >demo@gmail.com</a>
            </div>
            <div className="call flex gap-2">
            <IoCall className="w-[25px] h-[25px]" />

              <a href="#">
                Call us:<span>+91 0123456789</span>
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyR p-5 flex items-center justify-center text-white">
      Powered By {" "} <a href="https://www.opencart.com/">OpenCart</a> Your Store © 2024
      </div>
    </footer>
  );
};

export default Footer;
