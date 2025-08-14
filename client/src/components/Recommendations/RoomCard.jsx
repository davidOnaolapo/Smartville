import React, { useState, useContext } from "react";

import { styled } from '@mui/material';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import AppContext from "../../hooks/appContext";

import RecListItem from "./RecListItem";
import "./RoomCard.scss";
import { avatarForProduct, checkRoomPresent, getNewCostForRoom } from "../../helpers/selectors";

//modes for deletion of recitem

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#292F3D',
  margin: '20px',
  borderRadius: '5px',
  color: 'white',
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  fontSize: '18px',
  marginLeft: '-16px',
  fontWeight: 600,
  fontFamily: 'cursive'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#292F3D',
  marginBottom: "3px",
  fontSize: "1.4em"
}));

const StyledDisplayRec = styled('div')(({ theme }) => ({
  margin: "-18px 0px 0px -18px",
  display: "flex",
  flexWrap: "wrap"
}));

export default function RoomCard(props) {
  const { id, products, name, avatar, cost } = props;

  const [roomPresent, setRoomPresent] = useState(true);

  const {
    deleteRecommendation,
    removeProductHome,
    gotProductHome,
  } = useContext(AppContext);


  const deleteRec = (removeRecObj) => {

    //do confirmation "ONCE YOU DELETE, ITS GONE FOREVER"
    //transition to deleting

    deleteRecommendation(removeRecObj)
    .then((res) => {
      console.log("INSIDE ROOM CARD, DEL REC", res)
      const newRooms = res;

      //To remove empty room from page
      checkRoomPresent(newRooms, id);
      if (!checkRoomPresent(newRooms, id)){
        setRoomPresent(false);
      }
  
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  const deleteProductHome = (removeProdHomeObj) => {

    removeProductHome(removeProdHomeObj)
    .then((res) => {
      console.log("INSIDE ROOM CARD, REMOVE PROD HOME")
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  const addProductHome = (addProdHomeObj) => {

    gotProductHome(addProdHomeObj)
    .then((res) => {
      console.log("INSIDE ROOM CARD,ADD PROD HOME")
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  return (
    <StyledCard style={{ display: roomPresent ? 'flex' : 'none' }}>
      <div className="rec__card-top">
        <StyledCardHeader
          title={name}
          avatar={
            <StyledAvatar aria-label="recipe">
              {avatar}
            </StyledAvatar>
          }
        />
        <div className="rec__card-priceText">
          ${ cost/100 }
        </div>
      </div>
      <StyledDisplayRec>
        {
          products.map((product) => {
            return <RecListItem
              key={product.id}
              id = {product.id}
              title={product.name}
              image={product.image}
              price={product.price}
              avatar={avatarForProduct(product)}
              desc={product.description}
              quantity={product.quantity}
              stores={product.stores}
              deleteRec={deleteRec}
              deleteProductHome={deleteProductHome}
              addProductHome={addProductHome}
            />
          })
        }
      </StyledDisplayRec>
    </StyledCard>
  );
}
