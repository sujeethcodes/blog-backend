const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    comments: [{
        postId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
});

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;
