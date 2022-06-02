import './App.css';
import Header from './components/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Posts from './components/Posts';
import UserPosts from './components/UserPosts';
import AddPosts from './components/AddPost';
import PostDetails from './components/PostDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store';

function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(state => state.isLoggedIn);
	console.log(isLoggedIn);
	useEffect(() => {
		if(localStorage.getItem("userId")) {
			dispatch(authActions.login());
		}
	}, [dispatch])
  	return (
      	<React.Fragment>
			{/* <header> */}
				{/* <Header /> */}
			{/* </header> */}
			<main>
				{isLoggedIn && <Header />}
				<Routes>
					{/* {!isLoggedIn ? <Route path="/auth" element={<Auth />}></Route> : */}
					{!isLoggedIn ? <Route path="/" element={<Auth />}></Route> :
					<>
					<Route path="/posts" element={<Posts />}></Route>
					<Route path="/myPosts" element={<UserPosts />}></Route>
					<Route path="/myPosts/:id" element={<PostDetails />}></Route>
					<Route path="/posts/add" element={<AddPosts />}></Route></>}
				</Routes>
			</main>
      	</React.Fragment>
  	);
}

export default App;
