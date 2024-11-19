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
  const [showCount, setShowCount] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
   
  const handleAddToCartClick = () => {
    setShowCount(true);
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
  
    // Toggle favorite status and update localStorage
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
  
    // Save updated user data in localStorage
    localStorage.setItem("user", JSON.stringify(parsedUser));
  
    // Make API call to update the user data on the server
    axios
      .put(`https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`, {
        wishlist: parsedUser.wishlist,
      })
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
            className=""
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
            {type != "sous" ? (
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
            <button
              onClick={() => {
                handleAddToCartClick();
              }}
              className="px-3 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <FaShoppingCart /> ADD TO CART
            </button>

            {showCount && type !== "pizza" && (
              <div className="count px-3 py-3 flex items-center">
                <span
                  onClick={() =>
                    count > 0 ? setCount(count - 1) : setShowCount(false)
                  }
                  className="pointer bg-red-500 w-[10px] h-[10px] rounded-xl flex items-center justify-center p-4"
                >
                  -
                </span>
                <span>{count}</span>
                <span
                  onClick={() => setCount(count + 1)}
                  className="pointer bg-red-500 w-[10px] h-[10px] rounded-xl flex items-center justify-center p-4"
                >
                  +
                </span>
              </div>
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
