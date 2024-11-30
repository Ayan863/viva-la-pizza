import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import React, { useEffect, useState, useCallback } from "react";
import "./modal.css";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Avatar from "@mui/joy/Avatar";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import axios from "axios";
import toast from "react-hot-toast";
const Modals = ({
  open,
  onClose,
  type,
  price,
  ingredients,
  name,
  image,
  id,
}) => {
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const isItemInBasket = parsedUser?.basket.some((item) => item.id === id);
  const [showCount, setShowCount] = useState(isItemInBasket || false);
  const [dynamicPrice, setDynamicPrice] = useState(price[0]);
  const [basketCount, setBasketCount] = useState(0);
  
  const getInitialQuantity = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const item = parsedUser.basket.find((item) => item.id === id);
        return item ? item.quantity : 1; // Sepette varsa miktarını al, yoksa 1
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    return 1; // Hata durumunda varsayılan 1
  };
  const getInitialSize = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const item = parsedUser.basket.find((item) => item.id === id);
        return item ? item.size : "regular"; // Sepette varsa boyutunu al, yoksa "regular"
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    return "regular"; // Hata durumunda varsayılan değer
  };
  const [valueSize, setValueSize] = React.useState("")
  const [valueSlice, setValueSlice] = React.useState(getInitialSize); // Başlangıç değeri dinamik
  const getInitialValue = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const item = parsedUser.basket.find((item) => item.id === id);
        return item ? item.size : "small"; // Sepette varsa boyutunu al, yoksa "small"
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
    return "small"; // Hata durumunda varsayılan değer
  };

  const [value, setValue] = useState(getInitialValue);

  const [quantity, setQuantity] = useState(getInitialQuantity);

  const handleSizeChange = async (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      let newPrice;
      switch (newValue) {
        case "small":
          newPrice = price[0];
          break;
        case "medium":
          newPrice = price[1];
          break;
        case "large":
          newPrice = price[2];
          break;
        default:
          newPrice = 0; // Varsayılan fiyat
      }
      setDynamicPrice(newPrice);
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const itemIndex = parsedUser.basket.findIndex((item) => item.id === id);

        if (itemIndex !== -1) {
          parsedUser.basket[itemIndex].size = newValue;
          parsedUser.basket[itemIndex].price = newPrice;
          parsedUser.basket[itemIndex].total = (quantity * newPrice).toFixed(2);
          localStorage.setItem("user", JSON.stringify(parsedUser));

          await updateUserBasketInAPI(parsedUser);
        }
      }
    }
  };

  const updatedPrice = () => {
    return (dynamicPrice * quantity).toFixed(2);
  };
  const removeItem = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const parsedUser = JSON.parse(storedUser);
      const updatedBasket = parsedUser.basket.filter((item) => item.id !== id);

      parsedUser.basket = updatedBasket;
      localStorage.setItem("user", JSON.stringify(parsedUser));

      await axios.put(
        `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
        { ...parsedUser, basket: parsedUser.basket }
      );

      toast.success("Item is removed from the basket");
      setShowCount(false);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [id]);
  const handleSliceChange = (event, newValue) => {
    if (newValue !== null) {
      setValueSlice(newValue);
    }
  };
  const updateBasketQuantity = (change) => {
    setBasketCount((prevCount) => prevCount + change);
  };
  const handleIncreaseQuantity = useCallback(async () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const itemIndex = parsedUser.basket.findIndex((item) => item.id === id);

        if (itemIndex !== -1) {
          parsedUser.basket[itemIndex].quantity = newQuantity;
          parsedUser.basket[itemIndex].total = (
            newQuantity * dynamicPrice
          ).toFixed(2);
          localStorage.setItem("user", JSON.stringify(parsedUser));
          updateUserBasketInAPI(parsedUser);
        }
      }

      return newQuantity;
    });
    updateBasketQuantity(1);
  }, [id, dynamicPrice]);

  const handleDecreaseQuantity = useCallback(() => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const itemIndex = parsedUser.basket.findIndex(
            (item) => item.id === id
          );

          if (itemIndex !== -1) {
            parsedUser.basket[itemIndex].quantity = newQuantity;
            parsedUser.basket[itemIndex].total = (
              newQuantity * dynamicPrice
            ).toFixed(2);
            localStorage.setItem("user", JSON.stringify(parsedUser));
          }
        }

        updateBasketQuantity(-1);
        return newQuantity;
      } else {
        removeItem();
        return prevQuantity;
      }
    });
  }, [id, dynamicPrice, removeItem, updateBasketQuantity]);

  const updateUserBasketInAPI = async (parsedUser) => {
    try {
      await axios.put(
        `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
        { ...parsedUser, basket: parsedUser.basket }
      );
    } catch (error) {
      toast.error("Failed to sync with API.");
    }
  };

  const handleAddToCartClick = () => {
    const storedUser = localStorage.getItem("user");
    let parsedUser = storedUser ? JSON.parse(storedUser) : { basket: [] };

    const itemIndex = parsedUser.basket.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      parsedUser.basket.push({
        id,
        name,
        type,
        price: dynamicPrice,
        ingredients,
        image,
        size: value,
        quantity,
        total: updatedPrice(),
      });
      setBasketCount((prev) => prev + quantity);
    } else {
      const quantityChange = quantity - parsedUser.basket[itemIndex].quantity;
      parsedUser.basket[itemIndex].quantity = quantity;
      parsedUser.basket[itemIndex].total = updatedPrice();
      setBasketCount((prev) => prev + quantityChange);
    }

    localStorage.setItem("user", JSON.stringify(parsedUser));

    axios
      .put(
        `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
        {
          ...parsedUser,
          basket: parsedUser.basket,
        }
      )
      .then(() => {
        toast.success("Item is added to the basket");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });

    setShowCount(true);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const itemIndex = parsedUser.basket.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        setValue(itemIndex.size); // Boyutu ayarla

        parsedUser.basket[itemIndex].quantity = quantity;
        parsedUser.basket[itemIndex].total = (quantity * dynamicPrice).toFixed(
          2
        );
        setValueSlice(parsedUser.basket[itemIndex].size); // Boyutu güncelle

        localStorage.setItem("user", JSON.stringify(parsedUser));
        setQuantity(parsedUser.basket[itemIndex].quantity);
        setShowCount(true);
        updateUserBasketInAPI(parsedUser);
      } else {
        setShowCount(false);
      }
    }
  }, [quantity, dynamicPrice, id]);

  return (
    <Modal open={open} onClose={onClose} className="modal">
      <ModalDialog
        color="neutral"
        layout="center"
        variant="plain"
        className="modal"
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          maxWidth: "90%",
          height: "510px !important",
          width: "650px !important",
        }}
      >
        <ModalClose />
        <div className="relative flex items-center justify-start gap-4">
          <div className="absolute right-0 top-[58%] transform -translate-y-1/2 w-1/2 h-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="max-w-[100%] min-h-[85%] object-fill hidden sm:block"
              style={{ clipPath: "inset(0 0 0 45%)" }}
            />
          </div>

          <div className="z-10 bg-white p-4">
            <Typography level="title-lg" className="name-modal text-[16px]">
              {name}
            </Typography>
            <Typography
              className="ingredients"
              level="body-sm"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              {ingredients !== "-" ? ingredients : null}
            </Typography>
            <div className="flex gap-4 items-center py-2">
              <Typography level="body-sm" className="price">
                {updatedPrice()}₼
              </Typography>
              {!showCount ? (
                <button
                  onClick={handleAddToCartClick}
                  className="px-3 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaShoppingCart /> ADD TO CART
                </button>
              ) : (
                <div className="cart-item-controls m-0 p-0">
                  <div className="quantity-controls">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="bg-gray-200 px-2 py-1 h-auto rounded-l-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="bg-gray-200 px-2 py-1 rounded-r-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="selection">
              <div className="select w-[100%]">
                <p>SELECT SIZE</p>
                <ToggleButtonGroup
                  className="flex items-center flex-col md:flex-row"
                  value={value}
                  exclusive
                  onChange={handleSizeChange}
                  sx={{
                    // display: "flex",
                    // flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <Button
                    key="small" // key ekleyin
                    className={`btn ${value === "small" ? "selected" : ""}`}
                    value="small"
                    selected={value === "small"}
                    onClick={() => handleSizeChange("small", price[0])}
                  >
                    <img
                      src="https://dominospizza.az/static/media/small.3c7b3f6b.webp"
                      alt="small-size"
                      className="w-[37px] h-[37px]"
                    />
                    <div className="text">
                      <p>Small</p>
                      <span>{price[0]}₼</span>
                    </div>
                  </Button>
                  <IconButton
                    key="medium" // key ekleyin

                    className={`btn ${value === "medium" ? "selected" : ""}`}
                    value="medium"
                    selected={value === "medium"}
                    onClick={() => handleSizeChange("medium", price[1])}
                  >
                    <img
                      src="https://dominospizza.az/static/media/medium.1852d9f7.webp"
                      alt="medium-size"
                      className="w-[37px] h-[37px] object-"
                    />
                    <div className="text">
                      <p>Medium</p>
                      <span>{price[1]}₼</span>
                    </div>
                  </IconButton>
                  <IconButton
                    key="large" // key ekleyin
                    className={`btn ${value === "large" ? "selected" : ""}`}
                    value="large"
                    selected={value === "large"}
                    onClick={() => handleSizeChange("large", price[2])}
                  >
                    <img
                      src="https://dominospizza.az/static/media/large.bc36cb66.webp"
                      alt="large-size"
                      className="w-[37px] h-[37px]"
                    />
                    <div className="text">
                      <p>Large</p>
                      <span>{price[2]}₼</span>
                    </div>
                  </IconButton>
                </ToggleButtonGroup>
              </div>
              <div className="select">
                <p>SELECT SLICE</p>
                <ToggleButtonGroup
                  value={valueSlice} // Dilim state'i
                  exclusive
                  onChange={handleSliceChange}
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button
                    className="btn"
                    value="regular"
                    selected={valueSlice === "regular"}
                  >
                    <img
                      src="https://dominospizza.az/static/media/large-regular-cut.f635649f.webp"
                      alt="regular-cut"
                      className="w-[37px] h-[37px]"
                    />
                    <div className="text">
                      <p>Regular</p>
                      <span>6 Slices</span>
                    </div>
                  </Button>
                  <IconButton
                    className="btn"
                    value="double"
                    selected={valueSlice === "double"}
                  >
                    <img
                      src="https://dominospizza.az/static/media/large-double-cut.499307d9.webp"
                      alt="double-cut"
                      className="w-[37px] h-[37px] object-"
                    />
                    <div className="text">
                      <p>Double</p>
                      <span>12 Slices</span>
                    </div>
                  </IconButton>
                  <IconButton
                    className="btn"
                    value="square"
                    selected={valueSlice === "square"}
                  >
                    <img
                      src="https://dominospizza.az/static/media/large-square-cut.9dfa97a8.webp"
                      alt="square-cut"
                      className="w-[37px] h-[37px]"
                    />
                    <div className="text">
                      <p>Square</p>
                      <span>16 Slices</span>
                    </div>
                  </IconButton>
                </ToggleButtonGroup>
              </div>
              <div className="selsect-edge">
                <p>SELECT EDGE</p>
                <RadioGroup
                  aria-label="platform"
                  defaultValue="Website"
                  overlay
                  value={valueSize}
                  name="platform"
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    [`& .${radioClasses.checked}`]: {
                      [`& .${radioClasses.action}`]: {
                        inset: -1,
                        border: "3px solid",
                        borderColor: "primary.500",
                      },
                    },
                    [`& .${radioClasses.radio}`]: {
                      display: "contents",
                      "& > svg": {
                        zIndex: 2,
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        bgcolor: "background.surface",
                        borderRadius: "50%",
                      },
                    },
                  }}
                >
                  <Sheet
                    key="Website"
                    variant="outlined"
                    sx={{
                      borderRadius: "md",
                      boxShadow: "sm",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      minWidth: 120,
                      position: "relative",
                      width: "130px", // Şəkilin genişliyi
                      height: "65px", // Şəkilin hündürlüyü
                      backgroundImage:
                        'url("https://s3.eu-west-3.amazonaws.com/ppost/Mozzarella-Edge.png")',
                      backgroundSize: "cover", // Cover şəkil ölçüləri ilə uyğunlaşdıracaq
                      backgroundPosition: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <FormLabel
                      htmlFor="mozzarella"
                      sx={{
                        position: "absolute",
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      Mozzarella Edge
                    </FormLabel>
                    <Radio
                      id="mozzarella"
                      value="mozzarella"
                      checkedIcon={<CheckCircleRoundedIcon />}
                    />
                  </Sheet>

                  <Sheet
                    key="Documents"
                    variant="outlined"
                    sx={{
                      borderRadius: "md",
                      boxShadow: "sm",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      minWidth: 120,
                      position: "relative",
                      width: "130px", // Şəkilin genişliyi
                      height: "65px", // Şəkilin hündürlüyü
                      backgroundImage:
                        'url("https://s3.eu-west-3.amazonaws.com/ppost/Sausage-Edge.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <FormLabel
                      htmlFor="sausage"
                      sx={{
                        position: "absolute",
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      Sausage Edge
                    </FormLabel>
                    <Radio
                      id="sausage"
                      value="sausage"
                      checkedIcon={<CheckCircleRoundedIcon />}
                    />
                  </Sheet>

                  <Sheet
                    key="Social Account"
                    variant="outlined"
                    sx={{
                      borderRadius: "md",
                      boxShadow: "sm",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1.5,
                      p: 2,
                      minWidth: 120,
                      position: "relative",
                      width: "130px", // Şəkilin genişliyi
                      height: "65px", // Şəkilin hündürlüyü
                      backgroundImage:
                        'url("https://s3.eu-west-3.amazonaws.com/ppost/Parmesan-Edge.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <FormLabel
                      htmlFor="garlic"
                      sx={{
                        position: "absolute",
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        color: "white",
                        fontWeight: "bold",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      Garlic Sauce
                    </FormLabel>
                    <Radio
                      id="garlic"
                      value="garlic"
                      checkedIcon={<CheckCircleRoundedIcon />}
                    />
                  </Sheet>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default Modals;
