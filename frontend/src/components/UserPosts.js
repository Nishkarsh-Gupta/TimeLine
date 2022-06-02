import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post'

const UserPosts = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async() => {
    const res = await axios.get(`http://localhost:4000/api/post/user/${id}`)
    .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, [])
  console.log(user);
  return (
    <div>
      <div className='cards-div'>
      {user && user.posts && user.posts.map((post, index) => 
        <Post 
          id={post._id}
          key={index}
          isUser={true}
          title={post.title}
          description={post.description}
          imageURL={post.image}
          userName={user.name}
        />
      )}
    </div>
    </div>
  )
}

export default UserPosts