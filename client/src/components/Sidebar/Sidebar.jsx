import React, { useState } from "react";
import {Link} from "react-router-dom"

import { styled } from '@mui/material/styles';

import "../Application.scss";
import "./naoSpeaksApp.scss";

import { naoSidebar } from "../../helpers/naoHelp"

import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import classNames from "classnames";

const useStyles = styled((theme) => ({
  link:{
    color:"white",
    textDecoration: 'none' 
  }
}));

export default function Sidebar(props) {
  const { modeNao } = props

  const [ naoChangeStatement, setNaoChangeStatement ] = useState(false)

  const classes = useStyles();

  const naoTalking = naoSidebar(modeNao)
  let x = 0

  if(naoTalking.heSays.length > 1) {
    setTimeout(() => {  
      setNaoChangeStatement(true)
    }, 5000);
  }
  
  
  return (
    <div className="sidebar__menu">
      <div className="naoCircular__speaking"> 
        <div> 
            {(!naoChangeStatement || naoTalking.heSays.length === 1) &&
              naoTalking.heSays[0]
            }
            { naoChangeStatement &&
              naoTalking.heSays[x+1]
            }
        </div>                
      </div>
      <img className="sidebar--nao" src={naoTalking.img} alt="Nao Chilling"/>


      <div className="sidebar__halfTwo">
        <div className="sidebar__menuItem">
          <FlashOnIcon  className="sidebar__img"/>
          <Link to="/" className={classes.link}>
            <div className="sidebar__text">Getting Started</div>
          </Link>   
        </div>
        <div className="sidebar__menuItem">
            <AddToHomeScreenIcon className="sidebar__img" />
            <Link to="/products" className={classes.link}>
              <div className="sidebar__text">Products</div>  
            </Link>   
        </div>
        <div className="sidebar__menuItem">
          <ImportContactsIcon className="sidebar__img" />
          <div className="sidebar__text">Take Survey</div>
        </div>
      </div>     
    </div>        
 );
}



