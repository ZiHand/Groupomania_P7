const jwt       = require('jsonwebtoken');
const UserModel = require('../models/user_model');

// ===================================================
// checkUser
// ===================================================
// Used on all GET request
// ===================================================
module.exports.checkUser = (req, res, next) =>
{
    const token = req.cookies.jwt;

    if (token)
    {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) =>
        {
            if (error)
            {
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge : 1});
                next();
            }
            else
            {
                let user        = await UserModel.findByPk(decodedToken.id, {attributes : {exclude : ["createdAt", "updatedAt", "password"]}});
                res.locals.user = user;
                next();
            }
        })
    }
    else
    {
        res.locals.user = null;
        next();
    }
}

// ===================================================
// requireAuth
// ===================================================
// 
// ===================================================
module.exports.requireAuth = (req, res, next) =>
{
    const token = req.cookies.jwt;

    if (token)
    {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) =>
        {
            if (error)
            {
                console.log(error);
            }
            else
            {
                console.log("User logged : " + decodedToken.id);
                next();
            }
        })
    }
    else
    {
        console.log("No Valid Token.");
        throw("No Valid Token.");
    }
}