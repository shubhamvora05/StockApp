import React from 'react'
import { Container } from 'react-bootstrap';
import Header from './Header';
import fire from '../fire.js';

function HomeContainer(props) {


  return (
    <Container>
    <Header/>
    <h1>Stock Data</h1>   
    </Container>
)
  
}

export default HomeContainer;
