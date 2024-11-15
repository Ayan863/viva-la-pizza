import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import React, { useState } from "react";
import "./modal.css"
import { FaShoppingCart } from "react-icons/fa";
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
  const [showCount, setShowCount] = useState(false);

  const handleAddToCartClick = () => {
    setShowCount(true);
  };
  return (
    <Modal open={open} onClose={onClose} >
      <ModalDialog color="neutral" layout="center" variant="plain" className="modal">
        <ModalClose />
        <div className="flex justify-between">
          <div className="text pl-3">
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
            <Typography level="body-sm" className="price">
              {price}₼
            </Typography>
            <Typography level="body-sm" className="start-from">
              starting from
            </Typography>
            <div className="flex">
            <button
              // onClick={handleAddToCartClick}
              onClick={() => { 
                handleAddToCartClick(); // Then call the function to show the count
              }}
              
              className="px-3 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <FaShoppingCart /> ADD TO CART
            </button>

            {showCount && type !== "pizza" && (
              <div className="count px-3 py-3 flex items-center">
                <span
                  onClick={() => count > 0 ? setCount(count - 1): setShowCount(false)}
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
          </div>
          <div className="image w-[350px] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              style={{ clipPath: "inset(0 0 0 45%  )" }}
            />
          </div>
          
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default Modals;
