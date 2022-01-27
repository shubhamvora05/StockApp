import React from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginContainer from "./LoginContainer";
import SignupContainer from './SignupContainer';
import HomeContainer from './HomeContainer';



function MainContainer(props) {
  
  if(window.isLoggedIn === false){
    var callContainer=<Routes><Route exact path="/" element={<LoginContainer/>} /> <Route path="/signup" element={<SignupContainer/>} /></Routes>
  }else{
    callContainer= <Routes><Route exact path="/" element={<HomeContainer/>} /></Routes>
  }
    
  return (
  <Router>
  {callContainer}  
  </Router>
    )
}



export default MainContainer;
