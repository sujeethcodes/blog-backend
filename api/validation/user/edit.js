const Joi = require('joi');
const editUser = Joi.object({
    name:  Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().optional(),
});

const editUserValidation = (req, res, next) => {
    const { error } = editUser.validate(req.query);
    if (error) {
        return res.status(406).send({status:406,message:error.details[0].message});
    }
    next();
};
module.exports = editUserValidation