import { Box, TabPanel, Tabs } from "@mui/joy";
import React, { useEffect, useState } from "react";
import Tab, { tabClasses } from "@mui/joy/Tab";
import axios from "axios";
import { Rating } from "@mui/material";

const Order = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state

  const colors = ["primary", "danger", "success", "warning"];

  async function getData() {
    try {
      const response = await axios.get(
        "https://66eba56d2b6cf2b89c5b2e2d.mockapi.io/Delivery"
      );
      console.log(response.data); // Log the response data
      setLoading(false); // Set loading to false once data is fetched

      setData(response.data); // Set the fetched data into state
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
      setLoading(false); // Set loading to false even on error
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box
      className="w-[100%]"
      sx={{
        flexGrow: 1,
        m: -3,
        p: 4,
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        position: "relative",
        // bgcolor: `${colors[index]}.500`,
      }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        sx={(theme) => ({
          p: 1,
          borderRadius: 16,
          width: "89%",
          mx: "auto",
          boxShadow: theme.shadow.sm,
          // "--joy-shadowChannel": theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            py: 1,
            flex: 1,
            transition: "0.3s",
            fontWeight: "md",
            fontSize: "md",
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.7,
            },
          },
        })}
      >
        <TabPanel>
          <h4 className="text-4xl font-extrabold p-5 text-gray-800 tracking-tight sm:text-5xl md:text-6xl">
            Order
          </h4>
          {data.length > 0 ? (
            <div className="flex gap-5 flex-wrap relative">
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
                          fontSize: "1.5rem", // Telefon ekranları için küçük boyut
                          "@media (min-width: 990px)": {
                            fontSize: "2rem", // Küçük ekranlarda daha büyük boyut
                          },
                          "@media (min-width: 1200px)": {
                            fontSize: "2.5rem", // Orta büyüklükteki ekranlarda daha büyük boyut
                          },
                        },
                      }}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  {/* {item.name} */}
                  {/* {item.phone} */}
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
          ) : (
            <span>Loading data...</span> // Show a loading message until data is fetched
          )}
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default Order;
