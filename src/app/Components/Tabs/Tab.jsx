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
import { TabPanel } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/app/redux/feature/product/productSlice";
import CardComp from "../Card/Card";

const TabPanels = () => {
  const [index, setIndex] = React.useState(0);
  const colors = ["primary", "danger", "success", "warning"];
  const dispatch = useDispatch();
  const { value, loading } = useSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const getApi = (name) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!value || value.length === 0) {
        return <div>No items available.</div>;
    }

    const filteredItems = name !== "all" 
        ? value.filter((item) => item.type.toLowerCase() == name.toLowerCase()) 
        : value;
        console.log("Filtered Items:", filteredItems);
    return (
      <div className="flex flex-wrap gap-2">
      {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
              <CardComp  key={item.id} type={item.type} status={item.status} price={item.price} ingredients={item.ingredients} name={item.name} image={item.image} id={item.id} />
          ))
      ) : (
          <div>No items found for the specified name.</div>
      )}
  </div>
    );
};

  return (
    <Box
    className="w-[100%]"
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
      <Tabs
  size="lg"
  aria-label="Bottom Navigation"
  value={index}
  onChange={(event, value) => setIndex(value)}
  sx={(theme) => ({
    p: 1,
    borderRadius: 16,
    width: '89%', // Genişliyi 90% olaraq təyin edirik
    mx: "auto", // Mərkəzləşdirmək üçün
    boxShadow: theme.shadow.sm,
    "--joy-shadowChannel": theme.vars.palette[colors[index]].darkChannel,
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
      </ListItemDecorator>
      All
    </Tab>
    <Tab
      disableIndicator
      orientation="vertical"
      {...(index === 1 && { color: colors[1] })}
    >
      <ListItemDecorator>
        <FaPizzaSlice />
      </ListItemDecorator>
      Pizzas
    </Tab>
    <Tab
      disableIndicator
      orientation="vertical"
      {...(index === 2 && { color: colors[2] })}
    >
      <ListItemDecorator>
        <RiDrinks2Fill />
      </ListItemDecorator>
      Drinks
    </Tab>
    <Tab
      disableIndicator
      orientation="vertical"
      {...(index === 3 && { color: colors[3] })}
    >
      <ListItemDecorator>
        <GiSaucepan />
      </ListItemDecorator>
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
