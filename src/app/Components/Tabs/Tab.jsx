"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaPizzaSlice } from "react-icons/fa";
import { GrRestaurant } from "react-icons/gr";
import { GiSaucepan } from "react-icons/gi";
import { AspectRatio, Card, TabPanel, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/feature/product/ProductSlice.js";
import CardComp from "../Card/Card";
import Skeleton from "@mui/joy/Skeleton";
import "./tab.css"
const TabPanels = () => {
  const [index, setIndex] = React.useState(0);
  const colors = ["primary", "danger", "success", "warning"];
  const { value, loading } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("default");
  const [sortType, setSortType] = React.useState("name"); // Default olaraq ada görə sıralama

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleSearch = (items) => {
    if (!searchTerm) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSort = (items) => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      if (sortType === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortType === "price") {
        const priceA = parseFloat(a.price[0]);
        const priceB = parseFloat(b.price[0]);
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      }
      if (sortOrder === "default") {
        sortedItems.sort((a, b) => a.id - b.id);
        return sortedItems;
      }
      return 0;
    });
    return sortedItems;
  };

  const getApi = (name) => {
    if (loading) {
      return (
        <div
          className="grid w-full gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          }}
        >
          {[...Array(10)].map((_, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <AspectRatio ratio="4/3">
                <Skeleton variant="overlay">
                  <img
                    alt=""
                    src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  />
                </Skeleton>
              </AspectRatio>
              <Typography>
                <Skeleton>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries.
                </Skeleton>
              </Typography>
            </Card>
          ))}
        </div>
      );
    }

    if (!value || value.length === 0) {
      return <div>No items available.</div>;
    }

    let filteredItems =
      name !== "all"
        ? value.filter((item) => item.type.toLowerCase() === name.toLowerCase())
        : value;
    filteredItems = handleSearch(filteredItems);
    filteredItems = handleSort(filteredItems);

    return (
      <div className="flex flex-wrap gap-2">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
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
          ))
        ) : (
          <div>No items found for the specified name.</div>
        )}
      </div>
    );
  };

  return (
    <Box
      className="w-[100%] flex flex-col items-center justify-center"
      sx={{
        flexGrow: 1,
        m: -3,
        p: 4,
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        bgcolor: `${"var(--colors-index)"}.500`,
      }}
      style={{ "--colors-index": colors[index] }}
    >
      <div className="flex w-[80%]">
        <p className="menu-services flex w-full">Menu Services</p>
        <div className="flex flex-col justify-end items-end mb-4 space-x-4 w-[100%] gap-2">
          {/* Axtarış */}
          <input
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[371px]"
          />

          {/* Sıralama */}
          <div className="flex gap-2">
          <select
            placeholder="Sort by"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[184px] "
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>

          {/* Order */}
          <select
            placeholder="Order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-300 w-[180px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default</option>
            <option value="asc">A-Z / Low to High</option>
            <option value="desc">Z-A / High to Low</option>
          </select>
          </div>
        </div>
      </div>

      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(event, value) => setIndex(value)}
        sx={(theme) => ({
          p: 1,
          borderRadius: 16,
          width: "89%",
          mx: "auto",
          boxShadow: theme.shadow.sm,
          "--joy-shadowChannel": theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            py: 1,
            flex: 1,
            transition: "0.3s",
            fontWeight: "md",
            fontSize: "md",
            [`&:not(.${tabClasses.selected}):not(:hover)`]: { opacity: 0.7 },
          },
        })}
      >
        <TabList
          variant="plain"
          size="sm"
          disableUnderline
          sx={{ borderRadius: "lg", p: 0 }}
        >
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 0 && { color: colors[0] })}
          >
            <ListItemDecorator>
              <GrRestaurant />
            </ListItemDecorator>{" "}
            All
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 1 && { color: colors[1] })}
          >
            <ListItemDecorator>
              <FaPizzaSlice />
            </ListItemDecorator>{" "}
            Pizzas
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 2 && { color: colors[2] })}
          >
            <ListItemDecorator>
              <RiDrinks2Fill />
            </ListItemDecorator>{" "}
            Drinks
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 3 && { color: colors[3] })}
          >
            <ListItemDecorator>
              <GiSaucepan />
            </ListItemDecorator>{" "}
            Sauce
          </Tab>
        </TabList>
        <TabPanel value={0}>{getApi("all")}</TabPanel>
        <TabPanel value={1}>{getApi("pizza")}</TabPanel>
        <TabPanel value={2}>{getApi("drinks")}</TabPanel>
        <TabPanel value={3}>{getApi("sous")}</TabPanel>
      </Tabs>
    </Box>
  );
};

export default TabPanels;
