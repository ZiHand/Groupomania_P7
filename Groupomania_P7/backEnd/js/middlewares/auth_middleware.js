const jwt       = require('jsonwebtoken');
const UserModel = require('../models/user_model');

exports.checkUser = (req, res, next) =>
{
    const token = req.cookies.jwt;

    if (token)
    {
        console.log("Token OK");
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) =>
        {
            console.log("Token verify");
            if (error)
            {
                console.log("Token verify FAILED");
                res.locals.user = null;
                res.cookie('jwt', '', {maxAge : 1});
                next();
            }
            else
            {
                console.log("Token verify OK");

                let user        = await UserModel.findByPk(decodedToken.id, {attributes : {exclude : ["createdAt", "updatedAt", "password"]}});
                res.locals.user = user;
                next();
            }
        })
    }
    else
    {
        res.locals.user = null;
        console.log("next null");
        next();
    }
}