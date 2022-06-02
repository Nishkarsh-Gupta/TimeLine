const express = require("express");
const { createPost, getAllPosts, updatePost, getPost, deletePost, getPostofUser } = require("../controllers/post");

const router = express.Router();

router.route("/").get(getAllPosts);
router.route("/create").post(createPost);
router.route("/update/:id").put(updatePost);
router.route("/:id").get(getPost);
router.route("/:id").delete(deletePost);
router.route("/user/:id").get(getPostofUser);

module.exports = router;