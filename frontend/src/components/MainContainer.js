// eslint-disable-next-line
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginContainer from "./LoginContainer";
import SignupContainer from './SignupContainer';
import HomeContainer from './HomeContainer';
import fire from '../fire.js';
import '../css/loginsingup.css';




function MainContainer(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    fire.auth().onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  
  const signOut = () => {
    fire.auth().signOut()
  };

    
  return (
  <Router>
   {!isLoggedIn
    ? (
      <Routes><Route exact path="/" element={<LoginContainer/>} /> <Route path="/signup" element={<SignupContainer isLoggedIn = {isLoggedIn}/>} /></Routes>
    ) 
    : (
      <>
      <span onClick={signOut}>
        <a href="#">Sign out</a>
      </span>
      
      <Routes><Route exact path="/" element={<HomeContainer/>} /><Route path="/signup" element={<SignupContainer isLoggedIn = {isLoggedIn}/>} /></Routes>
     
      </>
    
    )}
  </Router>
    )
}



export default MainContainer;
