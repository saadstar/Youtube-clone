import React, { useContext, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/context/AuthContext';
import LogoutIcon from "@mui/icons-material/Logout";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { UploadVideo } from "./UploadVideo";

export const NavBar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open,setOpen]=useState(false)
  const [q, setQ] = useState("");
  const navigate = useNavigate("");
  const logOut = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-wrapper">
          <div className="search">
            <input className="input" placeholder="Search" onChange={(e)=>setQ(e.target.value)} />
            <SearchIcon onClick={()=>navigate(`/search?q=${q}`)} />
          </div>
          <div className="login">
            {!user ? (
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <button className="login-button">
                  <AccountCircleIcon /> SIGN IN
                </button>
              </Link>
            ) : (
              <div className="nav-left">
                <button className="videocall-btn" onClick={() => setOpen(true)}>
                  <VideoCallIcon />
                </button>
                <div className="nav-left-div">
                  <img src={user?.img} alt="img" />
                  <h4>{user.username}</h4>
                </div>
                <button className="login-button" onClick={logOut}>
                  <LogoutIcon /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {open && <UploadVideo setOpen={setOpen} />}
    </>
  );
}
