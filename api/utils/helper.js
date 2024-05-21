const User = require("../model/user")
const Utils = {}

Utils.findAccount = async (userId) => {
    const findAccount = await User.findOne({_id: userId})
    return findAccount
}

module.exports = Utils