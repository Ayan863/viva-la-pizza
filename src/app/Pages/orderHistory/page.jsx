"use client";
import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Rating } from "@mui/material";

const page = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Header />
      <div className="p-5 h-[53vh]">
        <h4 className="text-[30px] py-5">Orders History</h4>
        <div className="text border p-2 w-[23%] rounded-md">
          {user && user.delivery && user.delivery.ordersData?.length > 0 ? (
            <>
              <div className="flex w-[100%] justify-center h-4">
                <Rating
                  name="half-rating"
                  className="absolute top-[-25px]"
                  defaultValue={user.delivery.rating}
                  sx={{
                    "& .MuiRating-icon": {
                      fontSize: "2rem",
                    },
                  }}
                  precision={0.5}
                  readOnly
                />
              </div>
              <p>
                <span>Total:</span> {user.delivery.ordersData[0].spent}
              </p>
              <p>
                <span>Date:</span>{" "}
                {user.delivery.ordersData[0].date && (
                  <span>
                    <span>{user.delivery.ordersData[0].date.slice(0, 4)}</span>{" "}
                    <span>{user.delivery.ordersData[0].date.slice(4, 10)}</span>{" "}
                  </span>
                )}
              </p>
              <p>
                <span>Content:</span> {user.delivery.content}
              </p>
              <p>
                <span>Location:</span>
                {user.delivery.location}
              </p>
              <p>
                <span>Duration:</span>
                {user.delivery.totalDuration}sec
              </p>
            </>
          ) : (
            <p>You have not placed any orders yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
