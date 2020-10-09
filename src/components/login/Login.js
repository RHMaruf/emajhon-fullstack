import React, { useContext, useState } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';

function Login() {
  const [newUser,setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: ''
  });

  initializeLoginFramework();
  const [loggedInUser , setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res,true);
    })
  }

  const fbSignIn = () =>{
    handleFbSignIn()
    .then(res =>{
      handleResponse(res,true);
    })
  }
  
  const signOut = () =>{
    handleSignOut()
    .then(res => {
      handleResponse(res,false);
    })
  }

  const handleSubmit = (e) =>{
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email,user.password)
      .then(res =>{
        handleResponse(res,true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res =>{
        handleResponse(res,true);
      })
    }
    e.preventDefault();
  }
  const handleResponse = (res , redirect) =>{
    setUser(res);
        setLoggedInUser(res);
     if(redirect) {
      history.replace(from)
     } 
  }
  const handleBlur= (event)=>{
    let isFieldValid=true;
    if(event.target.name ==="email"){
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log("email",isFieldValid);
    }
    if(event.target.name === "password"){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = (isPasswordValid && passwordHasNumber);
      console.log("password",isFieldValid);
    }

    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

 
  return (
    <div className="App">
      {
        user.isSignedIn ?
        <button onClick={signOut}>Sign Out</button>:
        <button onClick={googleSignIn}>Google Sign In</button>
      }
      <button onClick={fbSignIn}>Facebook Sign in</button>
      {
        
        user.isSignedIn && <div>
          <p>Welcome : {user.name}</p>
          <p>Yo/ur email : {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
        
      }
      <h1>Our Won Authentication</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit} action="">
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Write Email Address" required/>
        <br/>
        <input type="password" name="password"  onBlur={handleBlur} placeholder="Write Password" required/>
        <br/>
        <input type="submit" value={newUser?"Sign Up":"Sign in"}/>
      </form>
      {
        user.success && <p style={{color:"green"}}>User {newUser?'Create': 'Log in '} Successfully</p>
      }
      <p style={{color: "red"}}>{user.error}</p>
    </div>
  );
}

export default Login;
