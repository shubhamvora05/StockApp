import React from 'react';
import { Link} from "react-router-dom";
import { Navbar,Nav } from 'react-bootstrap';
import { Button} from 'react-bootstrap';
import fire from '../fire.js';
  
    const LogOut = () => {
      fire.auth().signOut()
    };


function Header(props) {
   
return (
<div>
  <Navbar bg="light" expand="lg">
  < Navbar.Brand href="#home">Stock APP</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">

      <Link to="/" className="nav-link">Home</Link>
      <Link to={`/user/${ fire.auth().currentUser.uid}`} className="nav-link">{fire.auth().currentUser.displayName}</Link>

      <Button variant="primary" onClick={LogOut}>Logout</Button>
      </Nav> 
    
    </Navbar.Collapse>
  </Navbar> 
</div>
    )
}


export default Header;