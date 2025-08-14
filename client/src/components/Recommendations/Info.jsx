import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

const useStyles = styled((theme) => ({
  main: {
    color:"white"
  },
}));

export default function Info(props) {
  return (
    <InfoIcon className={classes.main}/>
  )
}