import "./card.css";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
const CardComp = ({ type, status, price, ingredients, name, image, id }) => {
  return (
    <Card variant="outlined" sx={{ width: 300, backgroundColor: "white" }}>
      <CardOverflow>
        <img
          src={image}
          loading="lazy"
          alt={name}
          className={
            type == "pizza"
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
        <Typography level="title-md" className="name">{name}</Typography>
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
        <Typography level="body-sm" className="start-from">starting from</Typography>
      </CardContent>
    </Card>
  );
};

export default CardComp;
