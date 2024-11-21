import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
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
  const [quantity, setQuantity] = useState(1);
  const [showCount, setShowCount] = useState(false);
  const [value, setValue] = React.useState("small");
  const [valueSlice, setValueSlice] = React.useState("regular");

  const [dynamicPrice, setDynamicPrice] = React.useState(price);
  const getSizePrice = (size) => {
    if (size === "medium") return price * 1.2;
    if (size === "large") return price * 2;
    return price;
  };

  const handleSizeChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      setDynamicPrice(getSizePrice(newValue));
    }
  };
  const handleSliceChange = (event, newValue) => {
    if (newValue !== null) {
      setValueSlice(newValue);
    }
  };

  const updatedPrice = () => {
    return (dynamicPrice * quantity).toFixed(2);
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
        price,
        ingredients,
        image,
        quantity: quantity,
        total: price * quantity,
      });
    } else {
      parsedUser.basket[itemIndex].quantity += quantity;
      parsedUser.basket[itemIndex].total =
        parsedUser.basket[itemIndex].quantity * price;
    }

    localStorage.setItem("user", JSON.stringify(parsedUser));
    axios
    .put(
      `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
      {
        ...parsedUser, // parsedUser məlumatlarını göndəririk
        basket: parsedUser.basket, // yenilənmiş basket-i göndəririk
      }
    )
    .then((response) => {
      toast.success("Item is added to the basket")
    })
    .catch((error) => {

      toast.error("Something went wrong");
    });
    setShowCount(true);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    updateBasketQuantity(1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      updateBasketQuantity(-1);
    } else {
      removeItem();
    }
  };

  const updateBasketQuantity = (amount) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);
    const basket = parsedUser.basket || [];

    const itemIndex = basket.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      basket[itemIndex].quantity += amount;
      basket[itemIndex].total = basket[itemIndex].quantity * price;
    }

    parsedUser.basket = basket;
    localStorage.setItem("user", JSON.stringify(parsedUser));
    axios
    .put(
      `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
      {
        ...parsedUser,
        basket: parsedUser.basket,
      }
    )
    .then((response) => {
      // toast.success("Basket's updated")
    })
    .catch((error) => {
      toast.error("Something went wrong.");
    });
  };

  const removeItem = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);
    const updatedBasket = parsedUser.basket.filter((item) => item.id !== id);

    parsedUser.basket = updatedBasket;
    localStorage.setItem("user", JSON.stringify(parsedUser));
    axios
    .put(
      `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
      {
        ...parsedUser, 
        basket: parsedUser.basket,
      }
    )
    .then((response) => {
      toast.success("Item is removed from the basket")
    })
    .catch((error) => {
      toast.error("Something went wrong.")
    });
    setShowCount(false);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const itemExists = parsedUser.basket.some((item) => item.id === id);
      setShowCount(itemExists);
    }
  }, [id]);

  return (
    <Modal open={open} onClose={onClose} className="modal">
      <ModalDialog
        color="neutral"
        layout="center"
        variant="plain"
        className="modal"
        sx={{
          position: "fixed" /* Ekranın üzərində */,
          top: "50%" /* Yuxarıdan 50% məsafədə, ekranın ortasına */,
          left: "50%" /* Soldan 50% məsafədə, ekranın ortasına */,
          transform:
            "translate(-50%, -50%)" /* Modalın tam olaraq ortalanmasını təmin edir */,
          zIndex: 50 /* Modalın digər elementlərin üzərində olması üçün */,
          maxWidth: "90%",
          height:
            "510px !important" /* Ekranın böyük olmasını qarşısını alır */,
          width: "650px !important" /* Dinamik genişlik */,
        }}
      >
        <ModalClose />
        <div className="relative flex items-center justify-start gap-4">
          <div className="absolute right-0 top-[58%] transform -translate-y-1/2 w-1/2 h-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="max-w-[100%] min-h-[85%] object-fill"
              style={{ clipPath: "inset(0 0 0 45%)" }}
            />
          </div>

          <div className="z-10 bg-white  p-4">
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
              <div className="select">
                <p>SELECT SIZE</p>
                <ToggleButtonGroup
                  value={value}
                  exclusive
                  onChange={handleSizeChange}
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button
                    className="btn"
                    value="small"
                    selected={value === "small"}
                  >
                    <img
                      src="https://dominospizza.az/static/media/small.3c7b3f6b.webp"
                      alt="small-size"
                      className="w-[37px] h-[37px]"
                    />
                    <div className="text">
                      <p>Small</p>
                      <span>{price.toFixed(2)}₼</span>
                    </div>
                  </Button>
                  <IconButton
                    className="btn"
                    value="medium"
                    selected={value === "medium"}
                  >
                    <img
                      src="https://dominospizza.az/static/media/medium.1852d9f7.webp"
                      alt="medium-size"
                      className="w-[37px] h-[37px] object-"
                    />
                    <div className="text">
                      <p>Medium</p>
                      <span>{(price * 1.2).toFixed(2)}₼</span>
                    </div>
                  </IconButton>
                  <IconButton
                    className="btn"
                    value="large"
                    selected={value === "large"}
                  >
                    <img
                      src="https://dominospizza.az/static/media/large.bc36cb66.webp"
                      alt="large-size"
                      className="w-[37px] h-[37px]"
                    />
                    <div className="text">
                      <p>Large</p>
                      <span>{(price * 2).toFixed(2)}₼</span>
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
