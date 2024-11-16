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
import { getProduct } from "@/app/redux/feature/product/ProductSlice";
import CardComp from "../Card/Card";
import Skeleton from "@mui/joy/Skeleton";

const OurMenuTab = () => {
  const [index, setIndex] = React.useState(0);
  const colors = ["primary", "danger", "success", "warning"];
  const dispatch = useDispatch();
  const { value, loading } = useSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

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

    const filteredItems =
      name !== "all"
        ? value.filter((item) => item.type.toLowerCase() == name.toLowerCase())
        : value;
    console.log("Filtered Items:", filteredItems);
    return (
      <div className="flex flex-wrap gap-5 items-center justify-around">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div className="card flex w-[47%] h-[100px] items-center justify-between p-2 border-4	rounded-sm	border-s-[#c46d6d]	border-y-transparent border-e-transparent	" key={item.id}>
                <img src={item.image} alt={item.name} className="w-[90px] h-[90px] m-2"/>
                <div className="title w-[50%]">
                    <p className="name">{item.name}</p>
                    <span className="ingredients">{item.ingredients !== "-" ? item.ingredients : null}</span>
                </div>
                <div className="price">
                    <span>{item.price.toFixed(2)}₼</span>
                </div>
            </div>
            // <CardComp
            //   key={item.id}
            //   type={item.type}
            //   status={item.status}
            //   price={item.price}
            //   ingredients={item.ingredients}
            //   name={item.name}
            //   image={item.image}
            //   id={item.id}
            // />
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
          {/* <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 0 && { color: colors[0] })}
          >
            <ListItemDecorator>
              <GrRestaurant />
            </ListItemDecorator>
            All
          </Tab> */}
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
        {/* <TabPanel value={0}>{getApi("all")}</TabPanel> */}
        <TabPanel value={0}>{getApi("pizza")}</TabPanel>
        <TabPanel value={1}>{getApi("drinks")}</TabPanel>
        <TabPanel value={2}>{getApi("sous")}</TabPanel>
      </Tabs>
    </Box>
  );
};

export default OurMenuTab;
