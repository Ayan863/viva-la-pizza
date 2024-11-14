import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import React from "react";

const Modals = ({ open, onClose, type, price, ingredients, name, image, id }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog color="neutral" layout="center" variant="plain">
        <ModalClose />
        <div className="flex">
        <div className="image overflow-hidden">
  <img src={image} alt={name} className="w-full h-full object-cover" style={{ clipPath: 'inset(0 45% 0 0)' }} />
</div>
          <div className="text">
            <Typography level="title-md" className="name">
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
          </div>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default Modals;
