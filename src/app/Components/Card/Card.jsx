import "./card.css";
import React, { useState, useEffect, useCallback } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import Modals from "../Modal/Modals";
import { FaShoppingCart } from "react-icons/fa";
// import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { useState, useCallback } from "react";
// import axios from "axios";
import { toast } from "react-hot-toast";

const CardComp = ({ type, price, ingredients, name, image, id }) => {
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const [isModalOpen, setModalOpen] = useState(false);

  const isItemInBasket = parsedUser?.basket.some((item) => item.id === id);
  const [showCount, setShowCount] = useState(isItemInBasket || false);
  // const [dynamicPrice, setDynamicPrice] = useState(price[0]);
  const [basketCount, setBasketCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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
  const dynamicPrice = price[0]; // price dizisinden alınıyorsa, price[0] sayısı geçerli mi?
  // if (isNaN(dynamicPrice)) {
  //   console.error("Invalid price:", dynamicPrice);
  // }

  const handleSizeChange = async (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      let newPrice;
      if (newValue === "small") newPrice = price[0];
      else if (newValue === "medium") newPrice = price[1];
      else if (newValue === "large") newPrice = price[2];
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
  const handleFavoriteClick = useCallback(
    async (type, price, ingredients, name, image, id) => {
      try {
        const storedUser = localStorage.getItem("user");

        let parsedUser = storedUser ? JSON.parse(storedUser) : { wishlist: [] };
        const storedFavorites = parsedUser.wishlist || [];
        const itemIndex = storedFavorites.findIndex((item) => item.id === id);

        if (itemIndex === -1) {
          const updatedFavorites = [
            ...storedFavorites,
            { type, price, ingredients, name, image, id },
          ];
          parsedUser.wishlist = updatedFavorites;
          setIsFavorite(true);
          toast.success("Item is added to the wishlist.");
        } else {
          const updatedFavorites = storedFavorites.filter(
            (item) => item.id !== id
          );
          parsedUser.wishlist = updatedFavorites;
          setIsFavorite(false);
          toast.success("Item is removed from the wishlist.");
        }

        localStorage.setItem("user", JSON.stringify(parsedUser));

        await axios.put(
          `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
          { wishlist: parsedUser.wishlist }
        );

        window.dispatchEvent(new Event("storage"));
      } catch (error) {
        toast.error("Failed to update wishlist on the server.");
      }
    },
    []
  );

  const handleAddToCartClick = () => {
    const storedUser = localStorage.getItem("user");
    let parsedUser = storedUser ? JSON.parse(storedUser) : { basket: [] };
  
    const itemIndex = parsedUser.basket.findIndex((item) => item.id === id);
    const totalPrice = (quantity * dynamicPrice).toFixed(2); // Calculate the total price
  
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
        total: totalPrice, // Set the total price here
      });
      setBasketCount((prev) => prev + quantity);
    } else {
      const quantityChange = quantity - parsedUser.basket[itemIndex].quantity;
      parsedUser.basket[itemIndex].quantity = quantity;
      parsedUser.basket[itemIndex].total = totalPrice; // Update the total price
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
  const updatedPrice = () => {
    return (quantity * dynamicPrice).toFixed(2); // Calculate total price based on quantity and dynamic price
  };
  
  // const handleAddToCartClick = () => {
  //   const storedUser = localStorage.getItem("user");
  //   let parsedUser = storedUser ? JSON.parse(storedUser) : { basket: [] };

  //   const itemIndex = parsedUser.basket.findIndex((item) => item.id === id);
  //   if (itemIndex === -1) {
  //     parsedUser.basket.push({
  //       id,
  //       name,
  //       type,
  //       price: dynamicPrice,
  //       ingredients,
  //       image,
  //       size: value,
  //       quantity,
  //       total: updatedPrice(),
  //     });
  //     setBasketCount((prev) => prev + quantity);
  //   } else {
  //     const quantityChange = quantity - parsedUser.basket[itemIndex].quantity;
  //     parsedUser.basket[itemIndex].quantity = quantity;
  //     parsedUser.basket[itemIndex].total = updatedPrice();
  //     setBasketCount((prev) => prev + quantityChange);
  //   }

  //   localStorage.setItem("user", JSON.stringify(parsedUser));

  //   axios
  //     .put(
  //       `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
  //       {
  //         ...parsedUser,
  //         basket: parsedUser.basket,
  //       }
  //     )
  //     .then(() => {
  //       toast.success("Item is added to the basket");
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong");
  //     });

  //   setShowCount(true);
  // };

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
    <>
      <Card
        variant="outlined"
        sx={{ width: 300, backgroundColor: "white" }}
        onClick={handleOpenModal}
      >
        <CardOverflow>
          <img
            src={image}
            loading="lazy"
            alt={name}
            className={
              type === "pizza"
                ? "pizza object-cover p-5 max-h-[266px]"
                : "object-cover p-5 max-h-[266px]"
            }
          />
          {/* Favorite Button */}
          <IconButton
            aria-label="Like minimal photography"
            size="md"
            variant="solid"
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
              color: isFavorite ? "#FF0000" : "#fff",
              background: isFavorite ? "#FFECEC" : "#CC0000",
              "&:hover": {
                background: isFavorite ? "#FFECEC" : "#CC0000",
                color: isFavorite ? "#FF0000" : "#fff",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick(type, price, ingredients, name, image, id);
            }}
          >
            <Favorite />
          </IconButton>
        </CardOverflow>

        <CardContent className="flex flex-col items-start">
          <Typography level="title-md" className="name">
            {name}
          </Typography>
          <Typography
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
          <Typography level="body-sm" className="price">
            {type == "pizza" ? (
              <>
                {price[0]}₼ / {price[1]}₼ /{price[2]}₼
              </>
            ) : (
              <>{updatedPrice()}₼</>
            )}
          </Typography>
          <Typography level="body-sm" className="start-from">
            {type === "pizza"
              ? "Small / Middle / Large"
              : type === "drinks"
              ? "300ml / 500 / 1L"
              : "220g"}
          </Typography>

          <div className="flex">
            {type != "pizza" ? (
              !showCount ? (
                <button
                  onClick={handleAddToCartClick}
                  className="px-3 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaShoppingCart /> ADD TO CART
                </button>
              ) : (
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={handleDecreaseQuantity}
                      className="bg-gray-200 px-2 py-1 rounded-l-lg hover:bg-gray-300 transition duration-300"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={handleIncreaseQuantity}
                      className="bg-gray-200 px-2 py-1 rounded-r-lg hover:bg-gray-300 transition duration-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={removeItem}
                    className="delete-btn text-red-600 hover:text-red-800 ml-4 transition duration-300"
                  ></button>
                </div>

                // Miktar Kontrolleri
                // <div className="cart-item-controls">
                //   <div className="quantity-controls">
                //     <button
                //       onClick={handleDecreaseQuantity}
                //       className="bg-gray-200 px-2 py-1 rounded-l-lg hover:bg-gray-300"
                //     >
                //       -
                //     </button>
                //     <span className="px-4">{quantity}</span>
                //     <button
                //       onClick={handleIncreaseQuantity}
                //       className="bg-gray-200 px-2 py-1 rounded-r-lg hover:bg-gray-300"
                //     >
                //       +
                //     </button>
                //   </div>
                //   <button
                //     onClick={removeItem}
                //     className="delete-btn text-red-600 hover:text-red-800 ml-4"
                //   ></button>
                // </div>
              )
            ) : (
              <button className="px-3 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg">
                <FaShoppingCart /> ADD TO CART
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      <Modals
        open={type === "pizza" ? isModalOpen : false}
        onClose={type === "pizza" ? handleCloseModal : null}
        type="pizza"
        price={price}
        ingredients={ingredients}
        name={name}
        image={image}
        id={id}
      />
    </>
  );
};

export default CardComp;
