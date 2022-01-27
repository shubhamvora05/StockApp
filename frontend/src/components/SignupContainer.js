import React,{ useState } from 'react'
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
//import { isLoggedIn } from '../variables';
const axios = require('axios');


function SignupContainer(props) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('You@gmail.com');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('')
  
    
   function onSubmit(e) {
      e.preventDefault()

      const userObject = {
         
          email: email,
          password: password,
          confirmPassword: confirmPassword
          
      };

      axios.post('http://localhost:5000/signup', userObject)
          .then((res) => {
            if(res.data.message === "singup successful!"){
              window.isLoggedIn = true;
            }
            setMessage(res.data.message)
          }).catch((err) => {
            
            setMessage("Please, try again after a while.")
          });
  }


    return (
        <Container>
        <Row>
        <Col>
            <h1>Signup</h1>
            <Form className="form" >     
     <p>{message}</p> 
  <Form.Group controlId="formCategory1">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" defaultValue={username} onChange={e=>setUsername(e.target.value)} />
  
  </Form.Group>
  <Form.Group controlId="formCategory2">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" defaultValue={email} onChange={e=>setEmail(e.target.value)} />
  
  </Form.Group>
  <Form.Group controlId="formCategory3">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" defaultValue={password} onChange={e=>setPassword(e.target.value)} />
  
  </Form.Group>
  <Form.Group controlId="formCategory4">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" defaultValue={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
    </Form.Group>
    <p>Already have an account?<a href="/">Login Here</a></p>
    <Button variant="primary" onClick={onSubmit}>SIGNUP</Button>
  </Form>
   </Col>
   <Col></Col>
       </Row>
        </Container>
    )
}

export default SignupContainer;
