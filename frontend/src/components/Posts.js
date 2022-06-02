import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Post from "./Post";
// import "../styles/cards.css"

const Posts = () => {
  const [posts, setPosts] = useState();
  const sendRequest = async() => {
    const res = await axios.get("http://localhost:4000/api/post")
    .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then(data => setPosts(data.posts));
  }, [])
  console.log(posts);
  return (
    <div className='cards-div'>
      {posts && posts.map((post, index) => 
        <Post 
          id={post._id}
          isUser={localStorage.getItem("userId") === post.owner._id}
          title={post.title}
          description={post.description}
          imageURL={post.image}
          userName={post.owner.name}
        />
      )}
    </div>
  );
};

export default Posts