import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";

export const Card = ({ type,video }) => {
  const [chanel, setChanel] = useState({});

  const getAllChannels = async () => {
    try {
      const res = await axios.get(`http://localhost:3500/api/users/find/${video.userId}`);
      setChanel(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAllChannels();
  },[video.userId])
    return (
      <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
        <div className={type === "sm" ? "felx" : "card-container"}>
          <div className='card-img'>
          <img className='card-img' src={video.imgUrl} alt="card-img" />
          </div>
          <div className='detailes'>
              <img className={type==="sm"?"chanel-img":"chanel-img"} alt="chanel-img" src={chanel.img} />
              <div className='texts'>
              <h1 className='title'>{video.title}</h1>
              <h2 className='chanel-name'>{ chanel.username}</h2>
                  <div className='chanel-name'>{video.views} views . {format(video.createdAt)}</div>
              </div>
          </div>
            </div>
            </Link>
  )
}
