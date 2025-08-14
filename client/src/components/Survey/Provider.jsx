import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

//FOR PROVIDER
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
  color: "white"
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: "#e5e4e2",
  '& .MuiSelect-select': {
    backgroundColor: "#e5e4e2",
    color: "black"
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: "#e5e4e2"
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: "#e5e4e2"
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: "#e5e4e2"
  }
}));

const StyledProviderNames = styled('span')(({ theme }) => ({
  display: "flex", 
  justifyContent: "center"
}));

const StyledAndroidIcon = styled(AndroidIcon)(({ theme }) => ({
  marginBottom: '5px',
  marginLeft: '4px'
}));

const StyledAppleIcon = styled(AppleIcon)(({ theme }) => ({
  marginBottom: '5px',
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: "#e5e4e2",
  color: "black",
  '&:hover': {
    backgroundColor: "#d4d3d1"
  },
  '&.Mui-selected': {
    backgroundColor: "#c4c3c1"
  }
}));

export default function Provider(props) {
  const { provider, setProvider } = props 
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setProvider(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  console.log(provider)

  return(


      <StyledFormControl>
        <StyledInputLabel>Provider</StyledInputLabel>
        <StyledSelect
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={provider}
          onChange={handleChange}
        >
          <StyledMenuItem value={"android"}><StyledProviderNames>Android</StyledProviderNames>{open&&<StyledAndroidIcon/>}</StyledMenuItem>
          <StyledMenuItem value={"apple"}><StyledProviderNames>Apple</StyledProviderNames>{open&&<StyledAppleIcon/>}</StyledMenuItem>
          <StyledMenuItem value={"universal"}><StyledProviderNames>Both</StyledProviderNames></StyledMenuItem>
        </StyledSelect>
      </StyledFormControl>

    
  )
}
