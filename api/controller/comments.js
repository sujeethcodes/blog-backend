const Comment = require("../model/comments");
const User = require("../model/user");
const controller = {};
controller.createComment = async (req, res) => {
  try {
    const { userId, comments } = req?.body;
    const findCommentUser = await User.findOne({ userId });
    if (!findCommentUser)
      return res.json({ status: 406, message: "account not found" });
    if (findCommentUser) {
      const updateComments = await Comment.updateOne(
        { userId: findCommentUser?.userId },
        { $addToSet: comments }
      );
      if (!updateComments)
        return res.json({ status: 406, message: "create comments failed" });
      res.json({ status: 200, message: "comments successfull" });
    } else {
      const createComment = await Comment.create(req?.body);
      if (!createComment)
        return res.json({ status: 406, message: "create comments failed" });
      res.json({ status: 200, message: "comments successfull" });
    }
  } catch (err) {
    return res.json({ status: 500, message: err.message });
  }
};

controller.editComments = async (req, res) => {
  try {
    const editComments = await Comment.updateOne(
      { userId: req?.body?.userId, "comments.postId": req?.body?.postId },
      { $set: { "comments.$.comment": req?.body?.comment } }
    );
    if (editComments) {
      return res.json({ status: 200, message: "update success" });
    } else {
      return res.json("err");
    }
  } catch (err) {
    return res.json({ status: 500, message: err.message });
  }
};

controller.deleteComments = async (req, res) => {
  const deleteComments = await Comment.findOneAndUpdate(
    {
      userId: req?.body?.userId,
    },
    {
      $pull: {
        comments: { postId: req?.body?.postId, _id: req?.body?.commentId },
      },
    }
  );
  if (!deleteComments) return res.json("failed");
  res.json("success");
};
module.exports = controller;
