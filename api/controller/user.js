require("dotenv").config()
const User = require("../model/user")
const bcrypt = require("bcrypt")
const controller = {}
controller.createUser = async(req, res)=>{
    try {
        let data = {...req?.body}
        data.password = bcrypt.hashSync(req?.body?.password, 10)
        const findAccount = await User.findOne({email : data?.email})
        if(findAccount) return res.json({status:406, message:"This email id already have a account"})
        const createUser = await User.create(data)
        if(createUser){
            return res.json({status:200, message:"user created successfully"})
        }else{
            return res.json({status:406, message:"user created failed"})
        }
    } catch (e) {
        res.json({status:500, message:e.message})
    }
   
}

controller.editUser = async(req, res)=>{
    try {
        const findAccount = await User.findOne({email:req?.query?.email})
        if(!findAccount) return res.json({status:406, message:"invaild Account"})
        const updateUser = await User.updateOne({email:findAccount?.email}, {$set:req?.body})
        if(updateUser?.modifiedCount == 1){
            return res.json({status:200, message:"user update successfully"})
        }else{
            return res.json({status:406, message:"user update failed"})
        } 
    } catch (e) {
        res.josn({status:500, message:e.message})
    }
   
} 

controller.getUser = async(req, res)=>{
    try{
        const findAccount = await User.findOne({email:req?.query?.email})
        if(!findAccount) return res.json({status:406, message:"account not found"})
            return res.json({status:200, message:"success", userDetails:{name:findAccount?.name, email:findAccount?.email, }})
    }catch (e) {
        return res.json({status:500, message:e.message})
    }
}


module.exports = controller