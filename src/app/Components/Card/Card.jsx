import "./card.css";
import React, { useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import Modals from "../Modal/Modals";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CardComp = ({ type, price, ingredients, name, image, id }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const [quantity, setQuantity] = useState(1); // Default quantity
  const [showCount, setShowCount] = useState(false);

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
    setShowCount(true);
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
    axios.put(
      `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
      {
        ...parsedUser, // parsedUser məlumatlarını göndəririk
        basket: parsedUser.basket, // yenilənmiş basket-i göndəririk
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
        ...parsedUser, // parsedUser məlumatlarını göndəririk
        basket: parsedUser.basket, // yenilənmiş basket-i göndəririk
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
  const handleFavoriteClick = (type, price, ingredients, name, image, id) => {
    const storedUser = localStorage.getItem("user");

    let parsedUser;
    try {
      parsedUser = JSON.parse(storedUser);
    } catch (error) {
      toast.error("Error parsing user data:", error);
      return;
    }

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
      const updatedFavorites = storedFavorites.filter((item) => item.id !== id);
      parsedUser.wishlist = updatedFavorites;
      setIsFavorite(false);
      toast.success("Item is removed from the wishlist.");
    }

    localStorage.setItem("user", JSON.stringify(parsedUser));

    window.dispatchEvent(new Event("storage"));

    axios
      .put(
        `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
        {
          wishlist: parsedUser.wishlist,
        }
      )
      .then((response) => {
        console.log("Wishlist updated on server:", response.data);
      })
      .catch((error) => {
        console.error("Error updating wishlist on server:", error);
        toast.error("Failed to update wishlist on the server.");
      });
  };

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
            {type !== "sous" ? (
              <>
                {price.toFixed(2)}₼ / {(price * 1.2).toFixed(2)}₼ /{" "}
                {(price * 2).toFixed(2)}₼
              </>
            ) : (
              `${price.toFixed(2)}₼`
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
                // Sepete Ekle Butonu
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
