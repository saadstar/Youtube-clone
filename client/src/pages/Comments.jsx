import React, { useContext, useEffect, useState } from 'react';
import { Comment } from './Comment';
import axios from 'axios';
import {AuthContext} from "../Auth/context/AuthContext"

export const Comments = ({videoId}) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  
  useEffect(() => {
   const fetchComments= async () => {
      try {
        const res = await axios.get(`https://youtube-clone-api-1zzw.onrender.com/api/comment/${videoId}`)
        setComments(res.data);
      } catch (err) { }
    }
    fetchComments();
  }, [videoId]);
  return (
      <div className='comment-container'>
          <div className='new-comment'>
              <img className='avatar' src={user?.img} alt="img" />
              <input className='comment-input' placeholder='Add a comment.....'/>
      </div>
      {comments.map(comment => (
        <Comment key={comment._id} comment={comment } />        
      ))}         
    </div>
  )
}
