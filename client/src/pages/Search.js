import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation,Link } from 'react-router-dom';
import { Card } from '@mui/material';
import { format } from "timeago.js";
export const Search = () => {
    const [videos, setVideos] = useState([]);
    const [chanel, setChanel] = useState({});
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            try {
            const res = await axios.get(
              `https://youtube-clone-api-1zzw.onrender.com/api/video/search${query}`
            );
                setVideos(res.data);
                const chanelRes = await axios.get(
                  `https://youtube-clone-api-1zzw.onrender.com/api/users/find/${videos[0].userId}`
                );
                setChanel(chanelRes.data);
            }catch(err){}
      };
      fetchVideos();
    }, [query]);
  return (
    <div className="search-container">
          {videos.map((video) => {
              return (
                <Link
                  to={`/video/${video._id}`}
                  style={{ textDecoration: "none" }}
                >
                    <div className="card-container">
                      <div className="card-img">
                        <img
                          className="card-img"
                          src={video.imgUrl}
                          alt="card-img"
                        />
                      </div>
                      <div className="detailes">
                        <img
                          className="chanel-img"
                          alt="chanel-img"
                          src={chanel?.img}
                        />
                        <div className="texts">
                          <h1 className="title">{video.title}</h1>
                          <h2 className="chanel-name">{chanel.username}</h2>
                          <div className="chanel-name">
                            {video.views} views . {format(video.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                </Link>
              );
          })}
    </div>
  );
}
