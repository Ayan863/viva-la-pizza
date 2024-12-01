// "use client";
import Login from "./Pages/login/page";
import Carousel from "./Components/Carousel/Carousel";
import CarouselMini from "./Components/Carousel/CarouselMini";
import OurMenuTab from "./Components/Tabs/OurMenuTab";
import "./globals.css"
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
export const metadata = {
  title: "Viva-La-Pizza",
  description: "Viva-La-Pizza",
  icons: {
    icon: "/cheaf.png",
  },
};
export default function Home() {
  return (
    <>
      <Header />
      <section className="home-page">
        <Carousel />
        <div className="flex justify-center">
          <div className="history flex flex-col md:flex-row p-7 gap-5 items-center">
            {/* Text Section */}
            <div className="text w-full md:w-[420px] gap-2 flex flex-col justify-center items-center text-center">
              <h4 className="text-lg font-semibold  p-7">History</h4>
              <p className="text-gray-700">Welcome to Pizza</p>
              <span className="text-gray-600 text-sm">
                We would like to take this opportunity to welcome you to Pizza House. We are offering a warm, friendly atmosphere with family and friends at any time.
              </span>
              <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                About Us
              </button>
            </div>

            <div className="flex gap-5 justify-center items-center">
              <img
                src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/cms-img-02.jpg"
                alt="pizza"
                className="w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover pb-3 md:pb-6"
              />
              <img
                src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/cms-img-01.jpg"
                alt="pizza"
                className="w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 object-cover pt-3 md:pt-6"
              />
            </div>
          </div>
        </div>

        <h4 className="shop-now text-[47px] text-center pt-4 text-[#813b3b]">Our Menu</h4>
        <OurMenuTab />
        <CarouselMini

          images={["https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/3-home-default-870x564.jpg",
            "https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/4-home-default-870x564.jpg",
            "https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/5-home-default-870x564.jpg",
            "https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/1-home-default-870x564.jpg",
            "https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/2-home-default-870x564.jpg"]} />
      </section>
      <Footer />
    </>
  );
}
