import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import TimelineIcon from '@mui/icons-material/Timeline';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from '../store';
import { useNavigate } from "react-router-dom";

const Auth = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isSignup, setIsSignup] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		email: "",
		password: ""
	});
	
	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name] : e.target.value,
		}));
	};
	const sendRequest = async (type="login") => {
		const res = await axios.post(`http://localhost:4000/api/user/${type}`, {
			name: inputs.name,
			email: inputs.email,
			password: inputs.password
		}).catch((err) => console.log(err))
		const data = await res.data;
		// console.log(data);
		return data;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputs);
		if(isSignup) {
			sendRequest("signup")
			.then((data) => localStorage.setItem("userId", data.user._id))
			.then(() => dispatch(authActions.login()))
			.then(() => navigate("/posts"))
			.then((data) => console.log(data));
		} else {
			sendRequest()
			.then((data) => localStorage.setItem("userId", data.user._id))
			.then(() => dispatch(authActions.login()))
			.then(() => navigate("/posts"))
			.then((data) => console.log(data));
			// alert.show("logged In");
		}
	};
  	return (
    	<div>
			<form onSubmit={handleSubmit}>
				<Box 
				display="flex" 
				flexDirection="column"
				alignItems="center" 
				justifyContent="center"
				boxShadow="1px 1px 5px black"
				margin="auto"
				marginTop="30px"
				width="40%"
				padding="30px"
				lineHeight={5.5}>
					<TimelineIcon fontSize='large'/>
					<Typography padding={1.8} variant='h3'>
						TimeLine
					</Typography>
					<Typography padding={1.8}>
						Create stories from your life and experiences !
					</Typography>
					{isSignup && 
						<TextField 
							name='name' 
							onChange={handleChange} 
							value={inputs.name} 
							placeholder='Name' 
							margin='normal'
						/>}
					
					<TextField 
						name='email' 
						onChange={handleChange} 
						value={inputs.email} 
						type={"email"} 
						placeholder='Email' 
						margin='normal'
					/>
					<TextField 
						name='password' 
						onChange={handleChange} 
						value={inputs.password} 
						type={"password"} 
						placeholder='Password' 
						margin='normal'
					/>
					<Button 
						type='submit'
						variant='contained'
						color='warning'
						sx={{margin: "10px"}}>
							{isSignup ? "Register" : "Login"}
					</Button>
					<Button 
						onClick={() => setIsSignup(!isSignup)}
						variant="contained"
						sx={{margin: "10px"}}>
							{isSignup ? "Already have an account" : "Don't have an account"}
					</Button>
				</Box>
			</form>
    	</div>
  	)
};

export default Auth