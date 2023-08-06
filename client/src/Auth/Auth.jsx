import React, { useContext } from 'react'
import { Signup } from './Signup'
import { SignIn } from './SignIn'
import "./auth.css";
import { provider, auth } from "../firebase";
import { signInWithPopup } from 'firebase/auth';
import axios from "axios";
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const signInWithGoogle = async() => {
    dispatch({ type: "LOGIN_START"});
    signInWithPopup(auth, provider).then((result) => {      
      axios.post("http://localhost:3000/auth/google", {
        username:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL
      }).then((res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/")
      })
    }).catch((err) => {
      dispatch({ type: "LOGIN_FAILED", payload:err });      
    })
}

  return (
      <div className='auth'>
         <SignIn/>
      <h6>Or</h6>
      <button onClick={signInWithGoogle} className='googleBtn'>Sign in With Google</button>
          <h6>Or</h6>
         <Signup/>
    </div>
  )
}
