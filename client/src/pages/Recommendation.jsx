import { Card } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/video/tags?tags=${tags}`);
            setVideos(res.data)
        }
        fetchVideos();
    },[tags])
  return (
      <div className='recomendation-container'>
          {videos.map((video) => {
              return (
                  <Card key={video._id} type="sm" video={ video}/>
              )
          })}
      </div>
  )
}
