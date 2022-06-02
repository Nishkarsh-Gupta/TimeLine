import React from 'react'
import { AppBar, Toolbar, Typography , Box, Button, Tab, Tabs } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { authActions } from '../store';
// import "../styles/cards.css";

const Header = () => {
	const [ value, setValue ] = useState();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(state => state.isLoggedIn);
  return (
    <div>
        <AppBar position="sticky" sx={{background: '#424242'}}>
            <Toolbar>
                {/* <MenuIcon /> */}
                <Typography variant="h4">TimeLine</Typography>

				{isLoggedIn && <Box display="flex" marginLeft="auto" marginRight="auto" justifyContent="space-between">
					<Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)}>
						<Tab LinkComponent={Link} to="/posts" label="Public"/>
						<Tab LinkComponent={Link} to="/myposts"  label="Dashboard"/>
					</Tabs>
				</Box>}

				<Box display="flex" marginLeft="auto">
					{
						!isLoggedIn && <> 
							<Button LinkComponent={Link} to="/" sx={{margin: "1"}} color='warning'>Login</Button>
							<Button LinkComponent={Link} to="/" sx={{margin: "1"}} color='warning'>Signup</Button>
						</>
					}
					{
						isLoggedIn && 
						<Button 
							LinkComponent={Link} to="/" 
							sx={{margin: "1"}} 
							color='warning'
							onClick={() => dispatch(authActions.logout())}>
								Logout
						</Button>
					}
				</Box>
				{isLoggedIn && <Box 
				position="fixed"
				bottom="30px"
				right="30px"
				borderRadius="5px"
				backgroundColor="#EC6C03">
					<Tabs>
						<Tab
						sx={{color:"white"}} 
						LinkComponent={Link} to="/posts/add"  label="Add"/>
					</Tabs>
				</Box>}
            </Toolbar>
        </AppBar>
        
    </div>
  )
}

export default Header