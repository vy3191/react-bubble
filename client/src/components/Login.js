import React from "react";
import axios from 'axios';
import './Login.css';

const Login = () => {

  return (
    <>
                  
        <form >
          <div className="container">
          <p>Welcome to the Bubble App!</p> 
            <label className="label" for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required />
            <label  className="label" for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required />
            <button type="submit">Login</button>
          </div>  
        </form>
      
    </>
  );      
};

export default Login;
