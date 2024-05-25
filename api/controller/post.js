const Post = require("../model/post");
const helperUtils = require("../utils/helper");

const controller = {};

controller.createPost = async (req, res) => {
  try {
    let findAccount = await helperUtils.findAccount(req?.body?.userId);
    if (!findAccount)
      return res.status(406).json({ status: 406, message: "User not found" });

    let post = req?.file;
    if (!post) return res.json({ status: 400, message: "No file uploaded" });

    const createPost = await Post.create({
      userId: req.body?.userId,
      post: post.filename,
    });
    if (!createPost)
      return res
        .status(406)
        .json({ status: 406, message: "Post creation failed" });

    return res.json({
      status: 200,
      message: "Post created",
      filePath: post.path,
    });
  } catch (error) {
    console.error(error);
    return res.json({ status: 500, message: "Internal server error" });
  }
};

controller.editPost = async (req, res) => {
  try {
    let findAccount = await helperUtils.findAccount(req?.body?.userId);
    if (!findAccount)
      return res.status(406).json({ status: 406, message: "User not found" });

    let post = req?.file;
    if (!post)
      return res.status(400).json({ status: 400, message: "No file uploaded" });

    const updatePost = await Post.upload(
      { userId: findAccount?._id, _id: req?.body?.podtId },
      { $set: { post: post.filename } }
    );
    if (!updatePost)
      return res
        .status(406)
        .json({ status: 406, message: "Post creation failed" });

    return res.json({
      status: 200,
      message: "Post updated",
      filePath: post.path,
    });
  } catch (error) {
    return res.json({ status: 500, message: "Internal server error" });
  }
};

module.exports = controller;
