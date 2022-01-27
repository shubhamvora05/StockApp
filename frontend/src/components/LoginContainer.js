import React,{ useState } from 'react'
import { Form ,Button} from 'react-bootstrap';
//import { Navigate } from "react-router-dom";
import fire from '../fire.js';
import '../css/loginsingup.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


const axios = require('axios');


function LoginContainer(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('')
    
    function onSubmit(e) {
      e.preventDefault()

      fire.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setMessage(error.message);
      }
      
      );

      // const userObject = {
         
      //     email: email,
      //     password: password,
          
      // };

      // axios.post('http://localhost:5000/signin', userObject)
      //     .then((res) => {
      //       if(res.data.message === "Login successful!"){
      //         window.isLoggedIn = true;
      //         <Navigate to="/"/>
      //       }
      //       setMessage(res.data.message)
      //     }).catch((error) => {
      //       setMessage("Please, try again or create a new account, if you are a new user.")
      //     });
   
  }

    return (
      <div className="auth-wrapper">
      <div className="auth-inner">
        <Form className="form">  
     
          <h3>Sign In</h3> 
          <p>{message}</p>
          <div className="form-group">
              <label>Email address</label>
              <Form.Control type="email"  className="form-control" defaultValue={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="form-group">
              <label>Password</label>
              <Form.Control type="password"  className="form-control" defaultValue={password} onChange={e=>setPassword(e.target.value)} />
          </div>

        <p><a href="/signup">Create New Account</a></p>
        <Button variant="primary" className="btn btn-primary btn-block" onClick={onSubmit}>SIGNIN</Button>
      </Form>
  </div>
  </div>
 
    );
}

export default LoginContainer;
