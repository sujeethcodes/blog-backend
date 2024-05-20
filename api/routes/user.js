const express = require("express")
const routes = express.Router()
const userCreateValidate = require("../validation/user/create")
const userController = require("../controller/user")
routes.post("/createUser", userCreateValidate,userController.createUser)
routes.put("/editUser", userController.editUser)
routes.get("/getUser", userController.getUser)
module.exports = routes



