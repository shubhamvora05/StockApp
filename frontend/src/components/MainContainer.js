// eslint-disable-next-line
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginContainer from "./LoginContainer";
import SignupContainer from './SignupContainer';
import HomeContainer from './HomeContainer';
import StockListContainer from './stockListContainer';

import fire from '../fire.js';
import '../css/loginsingup.css';




function MainContainer(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    fire.auth().onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
    
  return (
  <Router>
   {!isLoggedIn
    ? (
      <Routes><Route exact path="/" element={<LoginContainer/>} /> <Route path="/signup" element={<SignupContainer isLoggedIn = {isLoggedIn}/>} /></Routes>
    ) 
    : (
      <>
            
      <Routes><Route exact path="/" element={<HomeContainer/>} />
      <Route path="/watchlist/:id/" element={<StockListContainer/>} /><Route path="/signup" element={<SignupContainer isLoggedIn = {isLoggedIn}/>} /></Routes>
     
      </>
    
    )}
  </Router>
    )
}



export default MainContainer;
