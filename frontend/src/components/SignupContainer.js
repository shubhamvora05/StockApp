import React,{ useState } from 'react'
import { Container,Row,Col,Form ,Button} from 'react-bootstrap';
const axios = require('axios');


function SignupContainer(props) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
   function onSubmit(e) {
      e.preventDefault()

      const userObject = {
         
          email: email,
          password: password,
          
      };

      axios.post('http://localhost:5000/signup', userObject)
          .then((res) => {
              console.log(res.data.message)
          }).catch((error) => {
              console.log(error)
          });
   
  }


    return (
        <Container>
        <Row>
       
        <Col>
            <h1>Signup</h1>
            <Form className="form" >     
    <p>{props.msg}</p>
  <Form.Group controlId="formCategory1">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" defaultValue={props.username} onChange={e=>setUsername(e.target.value)} />
  
  </Form.Group>
  <Form.Group controlId="formCategory2">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" defaultValue={props.email} onChange={e=>setEmail(e.target.value)} />
  
  </Form.Group>
  <Form.Group controlId="formCategory3">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" defaultValue={props.password} onChange={e=>setPassword(e.target.value)} />
  
  </Form.Group>
  <Form.Group controlId="formCategory4">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" defaultValue={props.confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
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
