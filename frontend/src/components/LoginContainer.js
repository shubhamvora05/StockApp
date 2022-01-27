import React,{ useState } from 'react'
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
import { Navigate } from "react-router-dom";

const axios = require('axios');


function LoginContainer(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    
    function onSubmit(e) {
      e.preventDefault()

      const userObject = {
         
          email: email,
          password: password,
          
      };

      axios.post('http://localhost:5000/signin', userObject)
          .then((res) => {
            if(res.data.message === "Login successful!"){
              window.isLoggedIn = true;
              <Navigate to="/"/>
            }
            setMessage(res.data.message)
          }).catch((error) => {
            setMessage("Please, try again or create a new account, if you are a new user.")
          });
   
  }

    return (
        <Container>
        <Row>
        <Col>
        <h1>Login</h1>
            <Form className="form">     
    <p>{message}</p>
  <Form.Group >
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" defaultValue={email} onChange={e=>setEmail(e.target.value)} />
  
  </Form.Group>
  
  <Form.Group >
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" defaultValue={password} onChange={e=>setPassword(e.target.value)} />
  
  </Form.Group>
  <p><a href="/signup">Create New Account</a></p>
  <Button variant="primary" onClick={onSubmit}>SIGNIN</Button>
  </Form>
   </Col>
        <Col>
            
   </Col>
   
       </Row>
        </Container>
    )
}

export default LoginContainer;
