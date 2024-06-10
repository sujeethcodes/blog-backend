const express = require("express");
const routes = express.Router();
const createCommentValidation = require("../validation/comment/create");
const commentController = require("../controller/comments");
routes.post("/createComments", commentController.createComment);
routes.put("/editComments", commentController.editComments);
routes.delete("/deleteComments", commentController.deleteComments);
module.exports = routes;
