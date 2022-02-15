import React,{ useState } from 'react'
import { Form ,Button} from 'react-bootstrap';
import fire from '../fire.js';
import '../css/loginsingup.css';
import { Navigate } from "react-router-dom";
//const axios = require('axios');




function SignupContainer(props) {

    const [displayName, setUsername] = useState('');
    const [email, setEmail] = useState('You@gmail.com');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('')
  

   function onSubmit(e) {
      e.preventDefault()
      
      try{
      fire.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
        return result.user.updateProfile({
          displayName: displayName
        })
      })
      }catch(error) {
        setMessage(error.message);
        console.log(error.message)
      }    
  }


  
  if(props.isLoggedIn === false){
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Form className="form" >    
            <h1>Signup</h1> 
            <p>{message}</p> 
            <div className="form-group">
                <label>Username</label>
                <Form.Control type="text" className="form-control" defaultValue={displayName} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Email address</label>
                <Form.Control type="email"  className="form-control" defaultValue={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password</label>
                <Form.Control type="password"  className="form-control" defaultValue={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Confirm Password</label>
                <Form.Control type="password"  className="form-control"defaultValue={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
            </div>
            <p>Already have an account?<a href="/">Login Here</a></p>
            <Button variant="primary" onClick={onSubmit}>SIGNUP</Button>
            </Form>
      </div>
   </div>
    );
  }else{
    return(
  <Navigate to='/'/>
  )
  }
}

export default SignupContainer;
