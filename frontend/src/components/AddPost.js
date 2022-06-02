import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const labelStyle = {mb:1, mt:2,fontSize: "24px", fontWeight:"bold"};
const AddPost = () => {
  const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		title: "",
		description: "",
		imageURL: ""
	});
  const handleChange = (e) => {
    setInputs((prevState) => ({
			...prevState,
			[e.target.name] : e.target.value,
		}));
  }
  const sendRequest = async() => {
    const res = await axios.post("http://localhost:4000/api/post/create", {
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageURL,
      owner: localStorage.getItem("userId")
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data => console.log(data)).then(() => {
      navigate("/posts/");
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <InputLabel sx={labelStyle}>ImageURL</InputLabel>
        <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='normal' variant='outlined' />
        <Button sx={{mt: 2}} variant='contained' type='submit'>SUBMIT</Button>
      </Box>
      </form>
    </div>
  )
}

export default AddPost