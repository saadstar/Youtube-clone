import React, { useContext, useState } from 'react'
import {AuthContext} from "./context/AuthContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export const Signup = () => {
  const [username, setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const clickHandler = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try {
      const res = await axios.post("http://localhost:3500/api/auth/register", {
        username,email,password
      }) 
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/random");
      setUserName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
    <h1>Sign Up</h1>
        <input placeholder='username' required
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        />
        <input placeholder='email' required
        value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"/>
                  <input placeholder='password' required value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"/>
                  <button type="submit" onClick={clickHandler}>Sign Up</button>
            </>
  )
}
