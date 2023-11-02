import React, { useContext, useState } from 'react'
import "./auth.css";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const clickHandler = async (e) => {    
    e.preventDefault();
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("http://localhost:3500/api/auth/login", {
        username,
        password
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }
  return (
      <>
        <h1 className='title'>Sign In</h1>
        <h2>to continue</h2>              
        <input placeholder='username' required value={username}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        />
        <input
          placeholder='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />
                  <button type="submit" onClick={clickHandler}>Sign in</button>
        </>
  )
}
