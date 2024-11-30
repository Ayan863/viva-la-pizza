import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
// import OrdersTable from "./OrdersTable";
// import Todos from "./Todos";

const MainContent = () => {
  
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [totalSum, setTotalSum] = useState(0); // State to store the total sum
  const [userCount, setUserCount] = useState(0); // User sayı üçün state
  const [orderCount, setOrderCount] = useState(0); // User sayı üçün state
  const [menu, setMenu] = useState([]); // State to store fetched data

  async function getData() {
    try {
      const response = await axios.get(
        "https://66eba56d2b6cf2b89c5b2e2d.mockapi.io/Delivery"
      );
      console.log(response.data); // Log the response data
      setLoading(false); // Set loading to false once data is fetched

      setData(response.data);
      const sum = response.data.reduce(
        (acc, item) => acc + parseFloat(item.ordersData[0].spent || 0),
        0
      );
      setTotalSum(sum);
      setOrderCount(response.data.length)
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
      setLoading(false); // Set loading to false even on error
    }
  }
  async function getUser() {
    try {
      const response = await axios.get(
        "https://66eba35c2b6cf2b89c5b2596.mockapi.io/login"
      );
      console.log(response.data); // Log the response data
      setLoading(false); // Set loading to false once data is fetched

      setUserCount(response.data.length); // User sayını hesablayırıq

    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
      setLoading(false); // Set loading to false even on error
    }
  }
  async function getMenu() {
    try {
      const response = await axios.get(
        "https://66eba35c2b6cf2b89c5b2596.mockapi.io/pizza"
      );
      console.log(response.data); // Log the response data
      setLoading(false); // Set loading to false once data is fetched
      setMenu(response.data);


    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
      setLoading(false); // Set loading to false even on error
    }
  }
  useEffect(() => {
    getData();
    getMenu();
    getUser();
  }, []);
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Admin Panel</h1>
          {data.length > 0 ? (
            <div>
              {data.map((item, index) => (
                <div key={index} className="text">
                  <div>
                    {/* {loading ? (
                      <p>Yüklənir...</p>
                    ) : (
                      <div>
                        <h1>Ümumi Cəm: {totalSum}</h1>
                      </div>
                    )} */}
                  </div>
                  {/* <div className="">
                  {/* <Rating
                    name="half-rating"
                    className=""
                    defaultValue={item.rating}
                    sx={{
                      "& .MuiRating-icon": {
                        fontSize: "2rem", // Adjust the size of the stars (increase or decrease)
                      },
                    }}
                    precision={0.5}
                    readOnly
                  /> 
                  </div>
                  {item.name}
                  {item.phone}
                  <p><span>Total:</span> {item.ordersData[0].spent}</p>
                  <p><span>Date:</span> {item.ordersData[0].date && (
                    <span>
                      <span>{item.ordersData[0].date.slice(0, 4)}</span>{" "}
                      <span>{item.ordersData[0].date.slice(4, 10)}</span>{" "}
                    </span>
                  )}</p>
                  <p><span>Content:</span> {item.content}</p>
                  <p><span>Location:</span>{item.location}</p>
                  <p><span>Duration:</span>{item.totalDuration}</p> */}
                </div>
              ))}
            </div>
          ) : (
            <span>Loading data...</span>
          )}
        </div>
      </div>
      <ul className="box-info">
        <li>
          <span className="text">
            <h3>{orderCount}</h3>
            <p>New Order</p>
          </span>
        </li>
        <li>
          <span className="text">
            <h3>{userCount}</h3>
            <p>Visitors</p>
          </span>
        </li>
        <li>
          <span className="text">
            <h3>{totalSum}₼</h3>
            <p>Total Sales</p>
          </span>
        </li>
      </ul>
      <div className="table-data">
        {/* <OrdersTable /> */}
        {/* <Todos /> */}
      </div>
    </main>
  );
};

export default MainContent;
