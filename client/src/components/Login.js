import React, {useState} from "react";
import {token} from '../constants/localStorage';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = (props) => {
  const defaultUser = {username:'', password:''};
  const [user,setUser] = useState(defaultUser);

  const handleInput = (event) => {
     setUser({
       ...user, [event.target.name]:event.target.value
     })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('working', user)
     axios.post('http://localhost:5000/api/login', user)
          .then( response => {
             console.log(response);
             localStorage.setItem(token, response.data.payload);
             setUser(defaultUser);
             props.history.push("/bubble-page");
          })
          .catch(err => {
            console.log(err);
          })
  }
  console.log('login props', props);
  return (
    <>                  
        <form onSubmit={handleSubmit}>
          <div className="container">
          <p>Welcome to the Bubble App!</p> 
            <label className="label" htmlFor="username"><b>Username</b></label>
            <input type="text"
                   placeholder="Enter Username"
                   name="username" 
                   value={user.username}
                   onChange={handleInput}/>
            <label  className="label" htmlFor="psw"><b>Password</b></label>
            <input type="password" 
                   placeholder="Enter Password" 
                   onChange={handleInput} 
                   value={user.password}
                   name="password" />
            <button>Login</button>
          </div>  
        </form>      
    </>
  );      
};

export default withRouter(Login);
