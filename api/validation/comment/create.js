const Joi = require('joi');
const createComment = Joi.object({
    userId:  Joi.string().required(),
    postId: Joi.string().required(),
    comment: Joi.string().required(),
});

const createCommentValidation = (req, res, next) => {
    const { error } = createComment.validate(req.body);
    if (error) {
        return res.status(406).send({status:406,message:error.details[0].message});
    }
    next();
};
module.exports = createCommentValidation