import React, { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";


const MainContent = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [totalSum, setTotalSum] = useState(0); 
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0); 
  const [menu, setMenu] = useState([]);

  async function getData() {
    try {
      const response = await axios.get(
        "https://66eba56d2b6cf2b89c5b2e2d.mockapi.io/Delivery"
      );
      console.log(response.data); 
      setLoading(false); 

      setData(response.data);
      const sum = response.data.reduce(
        (acc, item) => acc + parseFloat(item.ordersData[0].spent || 0),
        0
      );
      setTotalSum(sum);
      setOrderCount(response.data.length)
    } catch (error) {
      console.error("Error fetching data:", error); 
      setLoading(false);
    }
  }
  async function getUser() {
    try {
      const response = await axios.get(
        "https://66eba35c2b6cf2b89c5b2596.mockapi.io/login"
      );
      console.log(response.data); 
      setLoading(false); 
      setUserCount(response.data.length); 

    } catch (error) {
      console.error("Error fetching data:", error); 
      setLoading(false); 
    }
  }
  async function getMenu() {
    try {
      const response = await axios.get(
        "https://66eba35c2b6cf2b89c5b2596.mockapi.io/pizza"
      );
      console.log(response.data); 
      setLoading(false); 
      setMenu(response.data);


    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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
                        fontSize: "2rem",
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
      {data.map((item, index) => (
                <div
                  key={index}
                  className="text border p-2 w-[23%] rounded-md min-w-[100px]"
                >
                  <div className="flex w-[100%] justify-center h-4">
                    <Rating
                      name="half-rating"
                      className="absolute top-[-25px]"
                      defaultValue={item.rating}
                      sx={{
                        "& .MuiRating-icon": {
                          fontSize: "1.5rem",
                          "@media (min-width: 990px)": {
                            fontSize: "2rem",
                          },
                          "@media (min-width: 1200px)": {
                            fontSize: "2.5rem", 
                          },
                        },
                      }}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="break-words">
                    <span>Total:</span> {item.ordersData[0].spent}
                  </p>
                  <p className="break-words">
                    <span>Date:</span>{" "}
                    {item.ordersData[0].date && (
                      <span className="break-words">
                        <span>{item.ordersData[0].date.slice(0, 4)}</span>{" "}
                        <span>{item.ordersData[0].date.slice(4, 10)}</span>{" "}
                        {/* First 4 digits */}
                        {/* Next 6 digits */}
                      </span>
                    )}
                  </p>
                  <p className="break-words">
                    <span>Content:</span> {item.content}
                  </p>{" "}
                  {/* Display the name */}
                  <p className="break-words">
                    <span>Location:</span>
                    {item.location}
                  </p>
                  <p className="break-words">
                    <span>Duration:</span>
                    {item.totalDuration}
                  </p>
                </div>
              ))}
      </div>
    </main>
  );
};

export default MainContent;
