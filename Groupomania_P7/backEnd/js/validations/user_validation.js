const Joi = require("joi");

// ===================================================
//                 User Validation
// ===================================================
const userValidation = (user) =>
{
    const userSchema = Joi.object
    (
        {
            first_name  : Joi.string().min(3).max(50).trim().required(),
            last_name   : Joi.string().min(3).max(50).trim().required(),
            email       : Joi.string().email().required(),
            password    : Joi.string().min(25).max(255).trim().required(),
            avatar_url  : Joi.string().min(3).max(150).trim(),
            moderator   : Joi.boolean().valid(true)
        }
    )

    return userSchema.validate(user);
}

// ===================================================
//               User Validation Export
// ===================================================
module.exports = userValidation;