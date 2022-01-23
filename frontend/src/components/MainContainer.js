import React from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginContainer from "./LoginContainer";
import SignupContainer from './SignupContainer';

function MainContainer(props) {
      
    return (
        
  <Router>
  <Routes>
        <Route exact path="/" element={<LoginContainer/>} /> 
        <Route path="/signup" element={<SignupContainer/>} />
        </Routes>
  </Router>
    )
}



export default MainContainer;
