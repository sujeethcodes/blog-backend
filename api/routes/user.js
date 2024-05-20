const express = require("express")
const routes = express.Router()
const userCreateValidate = require("../validation/user/create")
const userController = require("../controller/user")
routes.post("/createAccount", userCreateValidate,userController.createUser)
module.exports = routes



