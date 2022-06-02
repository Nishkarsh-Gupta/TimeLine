import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

const labelStyle = {mb:1, mt:2,fontSize: "24px", fontWeight:"bold"};
const PostDetails = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const id = useParams().id;
  const [inputs, setInputs] = useState({
		
	});
  const handleChange = (e) => {
    setInputs((prevState) => ({
			...prevState,
			[e.target.name] : e.target.value,
		}));
  }
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:4000/api/post/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  };
  console.log(id); 
  useEffect(() => {
    fetchDetails().then(data => {
      setPost(data.post)
      setInputs({title: data.post.title, description: data.post.description})
    });
  }, [id])
  console.log(post);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(() => {
      navigate("/myPosts/");
    });
  }
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:4000/api/post/update/${id}`, {
      title: inputs.title,
      description: inputs.description
    }).catch(err => console.log(err))
      const data = await res.data;
      return data;
  };
  return (
    <div>
      {inputs && <form onSubmit={handleSubmit}>
        <Box
        // border={3}
        boxShadow="5px 5px 10px #ccc"
        padding={3}
        margin={"auto"}
        display="flex"
        flexDirection="column"
        width="60%"
        marginLeft={"240px"}>
          <Typography fontWeight="bold" padding={3} variant="h3" color="#EC6C03" textAlign="center">Make Ur TimeSpan</Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField name='title' onChange={handleChange} value={inputs.title} margin='normal' variant='outlined' />
          <InputLabel sx={labelStyle}>Description</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='normal' variant='outlined' />
          <Button sx={{mt: 2}} variant='contained' type='submit'>SUBMIT</Button>
        </Box>
      </form> }
    </div>
  )
}

export default PostDetails