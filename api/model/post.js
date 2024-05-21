const mongoose = require("mongoose")
const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
})

const post = mongoose.model("post", postSchema)
module.exports = post