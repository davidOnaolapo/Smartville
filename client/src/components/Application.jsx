import React from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import HouseIcon from '@mui/icons-material/House';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Modal from "@mui/material/Modal";
import Button from '@mui/material/Button';


import "./Application.scss";
import "./Sidebar/naoSpeaksApp.scss";

import useApplicationData from "../hooks/useApplicationData"
import AppContext from "../hooks/appContext"

import SmartVille from "./SmartVille";
import Survey from "./Survey/index";
import Signup from "./Signup";
import Login from "./Login";
import RoomCardList from "./Recommendations/RoomCardList";
import Logout from './Logout'
import NotLoggedIn from "./Recommendations/NotLoggedIn"
import Sidebar from "./Sidebar/Sidebar"




import ProductList from "./ProductList"
import { transitions } from "@mui/material/styles";

//Declare material ui styling here
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#001029',
  display: 'flex',
  alignItems: "flex-end",
  '@media print': {
    display: 'none',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#76BED0",
  fontFamily: "system-ui",
  fontSize: "14px"
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  marginTop: '120px',
  justifyContent: 'center'
}));

const StyledUserNav = styled('div')(({ theme }) => ({
  display: "flex",
}));

export default function Application(props) {
  // material ui theme
  const theme = createTheme({
    palette: {
      background: {
        main: '#ffffff',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          main: {
            backgroundColor: "#001029",
            color: '#f5f5f5'
          },
        },
      },
    },
  });



  const [open, setOpen] = React.useState(false);

  const handleSurveyOpen = () => {
    setOpen(true);
  };

  const handleSurveyClose = () => {
    setOpen(false);
  };

  const {
    products,
    rooms,
    surveys,
    username,
    setUsername,
    submitSurveyUser,
    submitSurveyAnon,
    modeNao,
    gotProductHome,
    hasProductStore,
    transitionNao,
    recommendations,
    recommendationsAnon,
    removeProductHome,
    addProductHome,
    deleteRecommendation,
    switchSurvey,
    isloggedin,
    setloggedin
  } = useApplicationData();

  return (
    <Router>
      <AppContext.Provider value={{ deleteRecommendation, removeProductHome, gotProductHome, hasProductStore }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StyledAppBar position="static">
            <Toolbar style={{display:"flex", justifyContent: "space-between", width:"100%" }}>
              <img  className="sidebar__imgLogo" src="images/smartVilleLogo.png" alt="smartvilleLogo"/>
              <div style={{display:"flex"}}>
                <h1 style={{ fontFamily:"system-ui", marginLeft:"480px", fontStyle:"italic" }}>SM</h1>
                <HouseIcon  style={{marginTop:"5px", fontSize:"30px", fontStyle:"italic"}}/>
                <h1 style={{ fontFamily:"system-ui", fontStyle:"italic", marginLeft:"-2px"}}>RTVILLE</h1>
              </div>
              <StyledButton variant="outlined" color="primary" onClick={handleSurveyOpen}>
                TAKE SURVEY
              </StyledButton>
              <StyledUserNav style={{justifyContent: "space-between", fontFamily:"system-ui" }}>
                <Logout setuserName={setUsername} userName={username}
                  isloggedin={isloggedin} setIsloggedin={setloggedin}
                  transitionNao={transitionNao}  style={{fontFamily:"system-ui", fontWeight:500, marginRight:"20px" }}
                />
                <div style={{marginLeft:"30px"}}>
                  {isloggedin? <Avatar src="images/profilePic.jpg" alt="Lit"/>: null}
                </div>
              </StyledUserNav>
              <StyledModal open={open} onClose={handleSurveyClose}>
                <Survey submitSurveyAnon={submitSurveyAnon} submitSurveyUser={submitSurveyUser} handleSurveyClose={handleSurveyClose} />
              </StyledModal>
            </Toolbar>
          </StyledAppBar>

          <main className="layout">
            <section className="sidebar" style={{zoom:"90%"}}>
              <Sidebar modeNao={modeNao}/>
            </section>
            <Routes>
              <Route exact path='/' element={<SmartVille transitionNao={transitionNao} modeNao={modeNao}/>} />
              <Route path='/products' element={
                <div>
                  <ProductList products={products} transitionNao={transitionNao}/>
                </div>
              } />
              <Route path='/login' element={<Login setUser={setUsername} setIsloggedin={setloggedin} transitionNao={transitionNao} />} />
              <Route path='/signup' element={<Signup setUser={setUsername} setIsloggedin={setloggedin} transitionNao={transitionNao}/>} />
              <Route path='/profile' element={
                <div className="rooms">
                  <RoomCardList survey ={recommendations} transitionNao={transitionNao}/>
                </div>
              } />
              <Route path='/notLoggedIn' element={
                <div className="rooms">
                  <NotLoggedIn recommendationsAnon={recommendationsAnon} transitionNao={transitionNao}/>
                </div>
              } />
            </Routes>
          </main>
        </ThemeProvider>
      </AppContext.Provider>
    </Router>
  );
}
