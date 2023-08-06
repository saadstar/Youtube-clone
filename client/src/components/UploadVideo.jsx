import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UploadVideo = ({ setOpen }) => {

    const [video, setVideo] = useState(undefined);
    const [img, setImg] = useState(undefined);
    const [videoPer, setVideoPer] = useState(undefined);
    const [imgPer, setImgPer] = useState(undefined);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const handleInputs = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]:e.target.value}
        })
    }

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    }
    
    const uploadFile = (file,urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl"?setImgPer(Math.round(progress)) : setVideoPer(Math.round(progress))
                switch (snapshot.state) {
                    case "paused":
                        console.log("upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default: break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return {...prev,[urlType]:downloadURL}
                    })
                })
            }
        );
    };

    const handleUploadBtn = async (e) => {
        e.preventDefault();
            const res = await axios.post(`/video`,
                {
                ...inputs,
                tags,
            })
            setOpen(false);
            console.log({...inputs,tags})
          res.status ===200 &&  navigate(`/video/${res.data._id}`)
       
    }

    useEffect(() => {
     video&&   uploadFile(video,"videoUrl")
    }, [video]);

    useEffect(() => {
      img&&  uploadFile(img,"imgUrl")
    }, [img]);
  return (
      <div className='upload-container'> 
          <div className='upload-wrapper'>
              <div className='upload-close' onClick={()=>setOpen(false)}>X</div>
              <h1 className='upload-title'>Upload a New Video</h1>
              <label className='upload-label'>Video:</label>
              {videoPer > 0 ?("Uploading:"+videoPer+"%")  : (
                  <input 
                      className = 'upload-input' 
                      type = { "file" } 
                      accept = 'video/*'
                      onChange={(e) => setVideo(e.target.files[0])} />)
              }
              <input className='upload-input'
                  type="text"
                  placeholder='Title'
                  name="title"
                  onChange={handleInputs}
              />
              <textarea className='upload-input'
                  placeholder='Description'
                  rows={8}
                  name="desc"
                  onChange={handleInputs}
              ></textarea>
              <input className='upload-input' type="text" placeholder='Separate the tags with commas.'  onChange={handleTags}/>
              <label className='upload-label'>Image:</label>
              {imgPer > 0 ? ("Uploading:" + imgPer+"%") : (
                  <input
                      className='upload-input'
                      type={"file"}
                      accept='image/*'
                      onChange={(e) => setImg(e.target.files[0])} />)}
              <button className='upload-btn' onClick={handleUploadBtn}>Upload</button>
          </div>
    </div>
  )
}
