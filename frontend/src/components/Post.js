import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import "../styles/cards.css"

const Post = ({title, description, imageURL, userName, isUser, id}) => {
    const navigate = useNavigate();
    const handleEdit = (e) => {
        navigate(`/myPosts/${id}`);
    };
    const deleteRequest = async () => {
        const res = await axios.delete(`http://localhost:4000/api/post/${id}`)
        .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    }
    const handleDelete = (e) => {
        deleteRequest().then(() => navigate("/")).then(() => navigate("/posts"));
    };
  return (
    <div className='cards'>
        <Card 
        sx={{ 
            width: "40%",
            margin: "auto",
            mt: 2,
            mb: 2,
            padding: 2,
            boxShadow: "5px 5px 10px #ccc",
            ":hover": {
                boxShadow: "10px 10px 20px #ccc",
            } 
            }}>
        {isUser && (
            <Box display={"flex"}>
                <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}>
                    <EditIcon color='primary'/>
                </IconButton>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon color='error'/>
                </IconButton>
            </Box>
        )}
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: "red",}} aria-label="recipe">
                {userName.charAt(0)}
            </Avatar>
            }
            title={title}
            // subheader="September 14, 2016"
        />
        <CardMedia
            component="img"
            height="194"
            image={imageURL}
            alt="Paella dish"
        />
        <CardContent>
            <hr />
            <br />
            <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "} {description}
            </Typography>
        </CardContent>
        </Card>
    </div>
  )
}

export default Post