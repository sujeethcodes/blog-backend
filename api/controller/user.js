require("dotenv").config()
const User = require("../model/user")
const bcrypt = require("bcrypt")
const controller = {}
controller.createUser = async(req, res)=>{
    let data = {...req?.body}
    data.password = bcrypt.hashSync(req?.body?.password, 10)
    const findAccount = await User.findOne({emailId : data?.email})
    if(findAccount) return res.json({status:406, message:"This email id already have a account"})
    const createUser = await User.create(data)
    if(createUser){
        return res.json({status:200, message:"user created successfully"})
    }else{
        return res.json({status:406, message:"user created failed"})
    }
}
module.exports = controller