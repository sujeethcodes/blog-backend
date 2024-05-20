const Joi = require('joi');
const getUser = Joi.object({
    email: Joi.string().email().required(),
});

const getUserValidation = (req, res, next) => {
    const { error } = getUser.validate(req.query);
    if (error) {
        return res.status(406).send({status:406,message:error.details[0].message});
    }
    next();
};
module.exports = getUserValidation