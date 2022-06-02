const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { required } = require("nodemon/lib/config");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
    }]
});

userSchema.pre("save", async function (next) {

    // if and only if when the passoword is modified, like we only change the name then we don't need to again hash the same password
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    // moveforward
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);