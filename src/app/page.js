"use client";
import  Login  from "./Pages/login/page";
import Carousel from "./Components/Carousel/Carousel";
import CarouselMini from "./Components/Carousel/CarouselMini";
import OurMenuTab from "./Components/Tabs/OurMenuTab";
import "./globals.css"
export default function Home() {
  return (
    <section className="home-page">
      <Carousel />
      <div className="flex justify-center">
        <div className="history  flex p-5 gap-5">
          <div className="text w-[420px] gap-2 flex flex-col justify-center items-center text-center">
            <h4>history</h4>
            <p>Welcome to pizza</p>
            <span>We would like to take this opportunity to welc House. We are offering a warm, friendly atmosphere with family and friends at any time oft</span>
            <button>About Us</button>
          </div>
          <div className="flex gap-5">
            <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/cms-img-02.jpg" alt="pizza" className="pb-6" />
            <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/cms-img-01.jpg" alt="pizza" className="pt-6" />
          </div>
        </div>
      </div>
      <h4 className="shop-now text-[47px] text-center p-2 text-[#813b3b]">Our Menu</h4>
      <OurMenuTab />
      <CarouselMini
      
       images={["https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/3-home-default-870x564.jpg",
       "https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/4-home-default-870x564.jpg",
        "https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/5-home-default-870x564.jpg",
         "https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/1-home-default-870x564.jpg", 
         "https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/2-home-default-870x564.jpg"]} />
    </section>
  );
}
