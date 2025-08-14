import React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const useStyles = styled((theme) => ({
  check: {
   color:"white"
  },
  none: {
    display:"none"
  }
}))

export default function CheckBox(props) {
  const { handleProdHome, checkedProduct, user } = props
  const classes = useStyles();

  const handleChange = (event) => {
    handleProdHome(!checkedProduct);
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedProduct}
            onChange={handleChange}
            // key={id}
            color="primary"
            className={ user ? classes.check : classes.none}
          />
        }
      />
    </FormGroup>
  )
}