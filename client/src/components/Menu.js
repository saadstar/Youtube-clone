import React, { useContext } from 'react'
import logo from "../img/logo.png";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import ArticleIcon from "@mui/icons-material/Article";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/context/AuthContext';
import LogoutIcon from "@mui/icons-material/Logout";

export const Menu = () => {
  const { user, dispatch } = useContext(AuthContext);
  const logOut = async () => {
    try {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="menu-container">
      <div className="menu-wrapper">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="menu-logo">
            <img src={logo} alt="logo" className="menu-img" />
           <p>YouTube</p>
          </div>
        </Link>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="item">
            <HomeIcon />
            Home{" "}
        </div>
          </Link>
          <Link
            to="/trend"
            style={{ textDecoration: "none", color: "inherit" }}
          >
        <div className="item">
            <ExploreIcon />
            Explore
        </div>
          </Link>
          <Link to="/sub" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="item">
            <ArticleIcon />
            Subscribe
        </div>
          </Link>
        <div className="Hr"></div>
        <div className="item">
          <LibraryMusicIcon />
          Library
        </div>
        <div className="item">
          <HistoryIcon />
          History
        </div>
        <hr className="Hr" />
        <div className="login">
          Sign in to like videos,comments and subscribe
          {!user ? (
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <button className="login-button">
                <AccountCircleIcon /> SIGN IN
              </button>
            </Link>
          ) : (
            <button className="login-button" onClick={logOut}>
              <LogoutIcon /> Log Out
            </button>
          )}
        </div>
        <hr className="Hr" />
        <div className="item">
          <HomeIcon />
          Music
        </div>
        <div className="item">
          <AddBoxIcon />
          Sports
        </div>
        <div className="item">
          <HomeIcon />
          Gamming
        </div>
        <div className="item">
          <HomeIcon />
          Movies
        </div>
        <div className="item">
          <HomeIcon />
          News
        </div>
        <div className="item">
          <LiveTvIcon />
          Live
        </div>
        <hr className="Hr" />
        <div className="item">
          <HomeIcon />
          Settings
        </div>
        <div className="item">
          <HomeIcon />
          Report
        </div>
        <div className="item">
          <AcUnitIcon />
          Help
        </div>
        <div className="item">
          <AddHomeWorkIcon />
          Light Mode
        </div>
      </div>
    </div>
  );
}
