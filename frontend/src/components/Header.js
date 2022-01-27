import React from 'react';
import { Link,Route,Navigate } from "react-router-dom";
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import { Button} from 'react-bootstrap';


  
  function LogOut(e) {
    e.preventDefault()
    console.log(window.isLoggedIn);
    window.isLoggedIn = false;
    <Navigate to="/"/>
}

function Header(props) {
    
  
return (
<div>
  <Navbar bg="light" expand="lg">
  < Navbar.Brand href="#home">Stock APP</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">

      <Link to="/" className="nav-link">Home</Link>
      <Button variant="primary" onClick={LogOut}>Logout</Button>
        
      </Nav> 
    
    </Navbar.Collapse>
  </Navbar> 
</div>
    )
}


export default Header;