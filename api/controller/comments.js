const Comment = require("../model/comments");
const User = require("../model/user");
const controller = {};
controller.createComment = async (req, res) => {
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
};

controller.editComments = async (req, res) => {
  res.json("working");
};

module.exports = controller;
