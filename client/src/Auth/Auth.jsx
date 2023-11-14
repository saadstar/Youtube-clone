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
      axios.post("https://youtube-clone-api-1zzw.onrender.com/api/auth/google", {
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
    <div className='signin-container'>
      <div className='signin-wrapper'>
         <SignIn/>
      <h1>Or</h1>
      <button onClick={signInWithGoogle} className='googleBtn'>Sign in With Google</button>
          <h1>Or</h1>
         <Signup/>
      </div>
      </div>
  )
}
