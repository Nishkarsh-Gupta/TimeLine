const express = require("express");
const app = express();
const cors = require('cors');

//if it is in development mode
if(process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

//using middlewares
app.use(cors());
app.use(express.json());

//importing routes
const user = require("./routes/user");
const post = require("./routes/post");

//using routes
app.use("/api/user", user);
app.use("/api/post", post);


module.exports = app;