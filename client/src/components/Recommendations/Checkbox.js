import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
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