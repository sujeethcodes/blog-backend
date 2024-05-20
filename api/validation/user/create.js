const Joi = require('joi');
const createUser = Joi.object({
    name:  Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const createUserValidation = (req, res, next) => {
    const { error } = createUser.validate(req.body);
    if (error) {
        return res.status(406).send({status:406,message:error.details[0].message});
    }
    next();
};
module.exports = createUserValidation