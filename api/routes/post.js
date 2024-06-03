const express = require("express");
const routes = express.Router();
const postController = require("../controller/post");
const upload = require("../utils/upload");

routes.post("/createPost", upload.single('post'), postController.createPost);
routes.put("/editPost", upload.single('post'), postController.editPost)

module.exports = routes;