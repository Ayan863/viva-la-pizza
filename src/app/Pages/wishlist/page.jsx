"use client";

import React, { useEffect, useState } from "react";
import "./wishlist.css";
import toast from "react-hot-toast";
import CardComp from "@/app/Components/Card/Card";
import Link from "next/link";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
const Page = () => {
  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    const updateWishlist = () => {
      if (typeof window !== "undefined" && localStorage) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setWishlistData(parsedUser.wishlist || []);
          } catch (error) {
            console.error("Error parsing user data:", error);
            setWishlistData([]); 
          }
        }
      }
    };

    updateWishlist();

    window.addEventListener("storage", updateWishlist);

    return () => {
      window.removeEventListener("storage", updateWishlist);
    };
  }, []);

  console.log("hello", wishlistData);
  return (
    <>
    <Header/>
    <section className="wishlist">
      <h4 className={wishlistData.length > 0 ? "text-center" : null}>
        <div className="px-3">Wishlist Page</div>
      </h4>
      {wishlistData.length > 0 ? (
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-wrap gap-2 w-[90%]">
            {wishlistData.map((item) => (
              <CardComp
                key={item.id}
                type={item.type}
                status={item.status}
                price={item.price}
                ingredients={item.ingredients}
                name={item.name}
                image={item.image}
                id={item.id}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-items-message italic">
          <p>There are no items in your wishlist.</p>
          <Link href="./menu">
      <button className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md transition duration-300">
                Go Menu
            </button>
          </Link>
        </div>
      )}
    </section>
    <Footer/>
    </>
  );
};

export default Page;
