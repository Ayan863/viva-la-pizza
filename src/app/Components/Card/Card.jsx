import "./card.css";
import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";
import Modals from "../Modal/Modals"; // Modal bileşeninizin doğru yolu

const CardComp = ({ type, price, ingredients, name, image ,id}) => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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
            color="danger"
            sx={{
              position: "absolute",
              zIndex: 2,
              borderRadius: "50%",
              right: "1rem",
              bottom: 0,
              transform: "translateY(50%)",
            }}
          >
            <Favorite />
          </IconButton>
        </CardOverflow>
        <CardContent>
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
          <Typography level="body-sm" className="price">{price}₼</Typography>
          <Typography level="body-sm" className="start-from">{type === "pizza" ? "Small size" : type === "drinks" ? "200ml" : "220g"}</Typography>
        </CardContent>
      </Card>

      <Modals open={type === "pizza" ? isModalOpen : false}  onClose={type === "pizza" ? handleCloseModal : null} type="pizza" status={status} price={price} ingredients={ingredients} name={name} image={image} id={id} />
    </>
  );
};
// 

export default CardComp;
