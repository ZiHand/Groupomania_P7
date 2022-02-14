const Joi = require("joi");

// ===================================================
//                 Comment Validation
// ===================================================
const commentValidation = (post) =>
{
    const commentSchema = Joi.object
    (
        {
            ownerId : Joi.string().required(),
            message : Joi.string().min(0).max(500).trim(),
        }
    )

    return commentSchema.validate(post);
}

// ===================================================
//               Comment Validation Export
// ===================================================
module.exports = commentValidation;