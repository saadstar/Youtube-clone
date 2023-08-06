import React, { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import axios from "axios";

export const Home = ({type}) => {
  const [videos, setVideos] = useState([]);

  const getallVideos = async () => {
    try {
      const res = await axios.get(`http://localhost:3500/api/video/${type}`);
      setVideos(res.data);      
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getallVideos();
  }, [type]);

  return (
    <div className='home-container'>
       {videos.map((video) => ( 
        <Card key={video._id} video={video} />                 
      ))}
    </div>
  )
}
