import React, { useState } from "react";
import { styled } from '@mui/material';
import clsx from 'clsx';

import { checkForUser, formDataForHome } from "../../helpers/dataOrganisers"
import useVisualMode from "../../hooks/useVisualMode";
import Warning from "./Warning";


import Checkbox from './Checkbox'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';

import "./RecListItem.scss";

const FLOW = "FLOW";
const WARNING = "WARNING";

const StyledCard = styled(Card)(({ theme, inHome }) => ({
  maxWidth: 345,
  width: 350,
  backgroundColor: inHome ? '#908e90' : '#323949',
  margin: '20px',
  color: inHome ? 'black' : 'white',
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "615px"
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 220,
  margin: "5px 20px 20px 20px",
  borderRadius: "2px",
  backgroundSize: "contain",
  backgroundColor: "#fff",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#535e79',
}));

const StyledInfoIcon = styled(IconButton)(({ theme, inHome }) => ({
  marginLeft: '-10px',
  color: inHome ? 'black' : 'white',
  '&:hover': {
    color: "#FBE889",
  },
}));

const StyledDeleteIcon = styled(IconButton)(({ theme, inHome }) => ({
  marginLeft: '-10px',
  color: inHome ? 'black' : 'white',
  '&:hover': {
    color: "#DE9196",
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  fontSize: "1em",
  fontWeight: 'bold'
}));

const StyledCheckBox = styled('div')(({ theme }) => ({
  marginTop: "2px"
}));

const StyledPrice = styled('div')(({ theme }) => ({
  marginLeft: "10px",
  fontWeight: 600
}));

const StyledContent = styled(CardContent)(({ theme }) => ({
  color: "white",
    fontWeight:500,
    fontFamily: "Arial"
}));

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) : str;
}

export default function RecListItem(props) {

  const { id, title, image, price, info, desc, avatar, stores,
          quantity, deleteRec, deleteProductHome, addProductHome } = props


  const [checkedProduct, setCheckedProduct] = useState(false);
  const [prodInHome, setProdInHome] = useState(false);
  const { mode, transition, back } = useVisualMode(FLOW)

  const user = checkForUser();

  const handleDeleteRec = () => {

    transition(WARNING);
  }

  const handleDeleteConfirm = () => {
    const removeRecObj = formDataForHome(id, checkForUser());

    deleteRec(removeRecObj);
  }

  const handleDeleteRewind = () => {
    back()
  }

  const handleProdHome = (checkedStatus) => {
    const prodHomeObj = formDataForHome(id, checkForUser());

    if(!checkedProduct){
      addProductHome(prodHomeObj)
      setProdInHome(!prodInHome)
    } else {
      deleteProductHome(prodHomeObj)
      setProdInHome(!prodInHome)
    }

    setCheckedProduct(checkedStatus)
  }

  return (
    <StyledCard inHome={prodInHome}>
      { mode === FLOW &&
        <React.Fragment>
        <div>
          <StyledCardHeader
            avatar = {
              <StyledAvatar aria-label="recipe">
                {avatar}
              </StyledAvatar>
            }
            action={
              <StyledCheckBox>
                <Checkbox handleProdHome={handleProdHome} 
                  checkedProduct={checkedProduct}
                  user={user}
                />
              </StyledCheckBox>
            }
            title={truncate(title, 57)}
          />
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            {
              stores.map((store) =>{
                return <a href={store.productLink} style={{ margin: "0px 5px", color: prodInHome ? 'black' : 'white' }}>
                  {store.name}
                </a>
              })
            }
          </div>
          <div style={{ backgroundColor: "#fff", borderRadius: "2px", margin: "0px 16px", paddingTop: "2px" }}>
            <StyledCardMedia
              image={image}
              title={title}
            />
          </div>
          <StyledContent>
            <div style={{ color: prodInHome ? 'black' : 'white', fontWeight: 500, fontFamily: "Arial" }}>
              {
                desc
              }
            </div>
          </StyledContent>
        </div>
        <div>
          <CardActions className="rec__actions">
            <div>
              <StyledPrice>
                ${price/100}
                {(quantity > 1) &&
                  <span style={{ marginLeft: "5px" }}>x{quantity}</span>
                }
              </StyledPrice>
            </div>
            <div>
              <StyledInfoIcon inHome={prodInHome}>
                <InfoIcon />
              </StyledInfoIcon>
              <StyledDeleteIcon inHome={prodInHome} style={{ display: !user ? 'none' : 'block' }}>
                <DeleteIcon onClick={handleDeleteRec} />
              </StyledDeleteIcon>
            </div>
          </CardActions>
        </div>


        </React.Fragment>
      }

      { mode === WARNING &&
        <Warning deleteRewind={handleDeleteRewind} deleteConfirm={handleDeleteConfirm} />
      }
    </StyledCard>
  );
}
