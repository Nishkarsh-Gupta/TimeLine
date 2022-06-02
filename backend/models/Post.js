const mongoose = require("mongoose");

const postSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    }
});

module.exports = mongoose.model("Post", postSchema);