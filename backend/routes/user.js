const express = require("express");
const { getAllUsers, signup, login } = require("../controllers/user");

const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/signup").post(signup);
router.route("/login").post(login);


module.exports = router;