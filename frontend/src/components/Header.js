import React from 'react';
import { Link} from "react-router-dom";
import { Navbar,Nav } from 'react-bootstrap';
import { Button,Container} from 'react-bootstrap';
import fire from '../fire.js';
  
    const LogOut = () => {
      fire.auth().signOut()
    };


function Header(props) {
   
return (
<div>
  <Navbar collapseOnSelect expand="lg" bg="light" >
  <Container>
  <Navbar.Brand href="#home">Stock APP</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    <Link to="/" className="nav-link">WatchLists</Link>
      <Link to={`/user/${ fire.auth().currentUser.uid}`} className="nav-link">Your Profile</Link>
    </Nav>
    <Nav>
    <Link to={`/user/${ fire.auth().currentUser.uid}`} className="nav-link" >{fire.auth().currentUser.displayName}</Link>
      <Button variant="primary" onClick={LogOut}>Logout</Button>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
</div>

    )
}


export default Header;