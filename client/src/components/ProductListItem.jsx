import React, { useState } from "react";
import { styled } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const StyledCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: 350,
  margin: "10px 5px 10px 18px",
  borderRadius: "10px",
  boxShadow: "-15px -15px 15px rgba(255, 255, 255, 0), 15px 15px 15px rgba(255,255,255,0.3)",
});

const StyledCardMedia = styled(CardMedia)({
  backgroundSize: "contain",
  height: 220,
});

const StyledHiddenDiv = styled('div')({
  visibility: "hidden",
});

export default function ProductListItem(props) {
  const [show, setShow] = useState(true);
  const {
    product_name,
    product_price,
    product_decription,
    product_image,
  } = props;
  const toggleShow = () => {
    if (product_decription.length > 125) {
      setShow(prev => !prev)
    }
  }
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + " ...Show More" : str;
  }
  return (
    <>
      <StyledCard>
        <CardActionArea>
          <StyledHiddenDiv>displaynone</StyledHiddenDiv>
          <StyledCardMedia
            image={product_image}
            alt="product image"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
            >
              {product_name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              onClick={toggleShow}

            >
              {show ? truncate(product_decription, 125) : `${product_decription} ...Show Less`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions >
          <Button size="small" color="primary">
            {`$${product_price / 100}`}
          </Button>
        </CardActions>
      </StyledCard>
    </>
  );
}
