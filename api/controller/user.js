require("dotenv").config();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const Post = require("../model/post");
const mongoose = require("mongoose");
const controller = {};
controller.createUser = async (req, res) => {
  try {
    let data = { ...req?.body };
    data.password = bcrypt.hashSync(req?.body?.password, 10);
    const findAccount = await User.findOne({ email: data?.email });
    if (findAccount)
      return res.json({
        status: 406,
        message: "This email id already have a account",
      });
    const createUser = await User.create(data);
    if (createUser) {
      return res.json({ status: 200, message: "user created successfully" });
    } else {
      return res.json({ status: 406, message: "user created failed" });
    }
  } catch (e) {
    res.json({ status: 500, message: e.message });
  }
};

controller.editUser = async (req, res) => {
  try {
    const findAccount = await User.findOne({ email: req?.query?.email });
    if (!findAccount)
      return res.json({ status: 406, message: "invaild Account" });
    const updateUser = await User.updateOne(
      { email: findAccount?.email },
      { $set: req?.body }
    );
    if (updateUser?.modifiedCount == 1) {
      return res.json({ status: 200, message: "user update successfully" });
    } else {
      return res.json({ status: 406, message: "user update failed" });
    }
  } catch (e) {
    res.josn({ status: 500, message: e.message });
  }
};

controller.getUser = async (req, res) => {
  try {
    const findAccount = await User.findOne({
      _id: new mongoose.Types.ObjectId(req.query.userId),
    });
    if (!findAccount) {
      return res
        .status(406)
        .json({ status: 406, message: "Account not found" });
    }
    const findPost = await Post.find({ userId: findAccount._id });

    return res.status(200).json({
      status: 200,
      message: "Success",
      userDetails: {
        ...findAccount.toJSON(),
        _id: findPost?._id,
        post: findPost?.post,
        description: findPost?.description,
      },
    });
  } catch (e) {
    return res.status(500).json({ status: 500, message: e.message });
  }
};

controller.getAllUser = async (req, res) => {
  try {
    const findAccount = await User.find();
    if (!findAccount)
      return res.json({ status: 406, message: "account not found" });
    return res.json({
      status: 200,
      message: "success",
      userDetails: findAccount.map((each) => ({
        name: each?.name,
        email: each?.email,
      })),
    });
  } catch (e) {
    return res.json({ status: 500, message: e.message });
  }
};

controller.signIn = async (req, res) => {
  try {
    const signIn = await User.findOne({
      email: req?.body?.email,
    });
    if (!signIn) {
      return res.json({ status: 404, message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(
      req?.body?.password,
      signIn.password
    );
    if (password) {
      return res.json({ status: 200, message: "login successfully" });
    } else {
      return res.json({ status: 406, message: "login Failed" });
    }
  } catch (err) {
    return res.json({ message: err.message });
  }
};
module.exports = controller;
