import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';


const useStyles = styled((theme) => ({
  root: {
    display: 'flex',
    marginTop: '-40px',
    fontSize: '3em'
  },
  formControl: {
    margin: theme.spacing(3),
  },

  formLabel: {
    color:"white", 
    fontSize:"0.3em"
  },
}));

export default function Categories(props) {
  const { save, categories, setCategories, quantities, setQuantities } = props;
  const classes = useStyles();

	const handleQuantityChange = event => {
		setQuantities({ ...quantities, [event.target.name]: event.target.value });
	}

  const handleCategoryChange = (event) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };

  const { lights, speakers, hubs, appliances, thermostat, security, garage } = categories;
  const { lightsQty, speakersQty, hubsQty } = quantities;

  return(

      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLabel}>Categories</FormLabel>
          <FormGroup >
            <div className="survey__create-flex">
              <FormControlLabel
                control={<Checkbox checked={lights} onChange={handleCategoryChange} name="lights" />}
                label="Lights"
              />
              {lights&& <input
                className="survey__create-input-category text--semi-bold"
                name="lights"
                type="text"
	              value = {lightsQty}
                placeholder=""
			          onChange={handleQuantityChange}
                autoComplete="off"
              /> } 
            </div>
            <div className="survey__create-flex">
              <FormControlLabel
                control={<Checkbox checked={speakers} onChange={handleCategoryChange} name="speakers" />}
                label="Speakers"
              />
              {speakers&& <input
                className="survey__create-input-category text--semi-bold"
                name="speakers"
                type="text"
	              value = {speakersQty}
                placeholder=""
			          onChange={handleQuantityChange}
                autoComplete="off"
              /> } 
            </div>
            <div className="survey__create-flex">
              <FormControlLabel
                control={<Checkbox checked={hubs} onChange={handleCategoryChange} name="hubs" />}
                label="Hubs"
              />
              {hubs&& <input
                className="survey__create-input-category text--semi-bold"
                name="hubs"
                type="text"
	              value = {hubsQty}
                placeholder=""
			          onChange={handleQuantityChange}
                autoComplete="off"
              /> } 
            </div>
            <FormControlLabel
              control={<Checkbox checked={appliances} onChange={handleCategoryChange} name="appliances" />}
              label="Appliances"
            />
            <FormControlLabel
              control={<Checkbox checked={thermostat} onChange={handleCategoryChange} name="thermostat" />}
              label="Thermostat"
            />       
            <FormControlLabel
              control={<Checkbox checked={security} onChange={handleCategoryChange} name="security" />}
              label="Security Devices"
            />
            <FormControlLabel
              control={<Checkbox checked={garage} onChange={handleCategoryChange} name="garage" />}
              label="Garage Devices"
            />
          </FormGroup>
        </FormControl>
      </div>        
  )
}