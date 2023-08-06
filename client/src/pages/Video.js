import React, { useContext, useState, useEffect } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Comments } from "./Comments";
import { Card } from "../components/Card";
import { useLocation } from "react-router-dom";
import { format } from "timeago.js";
import axios from "axios";
import { VideoContext } from "../VideoContext/VideoContext";
import { Recommendation } from "./Recommendation";

export const Video = () => {
  const path = useLocation().pathname.split("/")[2];
  const [chanel, setChanel] = useState({});
  const { currentVideo, dispatch } = useContext(VideoContext);

  useEffect(() => {
    const getSingleVideo = async () => {
      try {
        dispatch({ type: "VIDEO_START" });
        const videoRes = await axios.get(`/video/find/${path}`);
        dispatch({ type: "VIDEO_SUCCESS", payload: videoRes.data });
        const channelRes = await axios.get(
          `/users/find/${currentVideo?.userId}`
        );
        console.log(currentVideo);
        setChanel(channelRes.data);
      } catch (err) {}
    };
    getSingleVideo();
  }, [path, dispatch]);

  return (
    <div className="video-container">
      <div className="content">
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="700px"
            src={currentVideo?.videoUrl}
            title="youtube video player"
            frameBorder="0"
            controls
            allow="accelerometer:autoplay; clipboard-write; encrypted-media; gyroscope;picture-in-picture"
            allowFullScreen
          />
        </div>
        <h1 className="video-title">{currentVideo?.title}</h1>
        <div className="video-detailes">
          <span className="video-info">
            {currentVideo?.views} views {format(currentVideo?.createdAt)}
          </span>
          <div className="video-buttons">
            <button className="video-button">
              <ThumbUpIcon />
              {currentVideo?.likes.length}
            </button>
            <button className="video-button">
              <ThumbDownIcon />
              {currentVideo?.dislikes.length}
            </button>
            <button className="video-button">
              <ReplyIcon />
              share
            </button>
            <button className="video-button">
              <AddTaskIcon />
              save
            </button>
          </div>
        </div>
        <hr className="hrr" />
        <div className="channel">
          <div className="channelinfo">
            <img className="channelimg" src={chanel} alt="chanel-cover" />
            <div className="chaneldetail">
              <span className="chanelname">{chanel.username}</span>
              <span className="chanelcounter">
                {chanel.subscribers} scubscriber
              </span>
              <p className="description">{currentVideo?.desc}</p>
            </div>
          </div>
          <button className="subscribe">subscribe</button>
        </div>
        <hr className="hrr" />
        <Comments videoId={currentVideo?._id} chanel={chanel} />
      </div>
      <div className="recomendation">
        <Recommendation tags={currentVideo?.tags} />
      </div>
    </div>
  );
};
