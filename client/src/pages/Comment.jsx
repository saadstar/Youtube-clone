import React, { useEffect, useState } from 'react'
import axios from "axios";

export const Comment = ({ comment }) => {
  const [chanel, setChanel] = useState({});

  useEffect(() => {
    const fetchChanel = async () => {
      try {
        const res = await axios.get(`https://youtube-clone-api-1zzw.onrender.com/api/users/find/${comment.userId}`)        
        setChanel(res.data);
      } catch (err) { }
    }  
    fetchChanel();
  },[comment.userId])
  return (
      <div className='commennt-container'>
          <img src={chanel?.img} alt="img" className='avatar' />
          <div className='commennt-details'>
              <span className='comment-title'>{chanel.username} <span className='comment-date'>1 day ago</span></span>             
        <span className='comment-text'>{ comment.desc}</span>
          </div>
    </div>
  )
}