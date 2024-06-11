const express = require("express");
const routes = express.Router();
const userCreateValidate = require("../validation/user/create");
const editValidate = require("../validation/user/edit");
const getValidate = require("../validation/user/getUser");

const userController = require("../controller/user");
routes.post("/createUser", userCreateValidate, userController.createUser);
routes.put("/editUser", editValidate, userController.editUser);
routes.get("/getUser", getValidate, userController.getUser);
routes.get("/getAllUser", userController.getAllUser);
routes.post("/signIn", userController.signIn);

module.exports = routes;
