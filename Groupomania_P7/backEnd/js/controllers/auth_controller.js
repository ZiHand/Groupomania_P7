const UserModel         = require('../models/user_model');
const UserValidation    = require('../validations/user_validation');
const jwt               = require('jsonwebtoken');
const maxAge            = 3 * 24 * 60 * 60 * 1000;

// ===================================================
// createToken
// ===================================================
const createToken = (id) =>
{
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: maxAge});
}

// ===================================================
// register
// ===================================================
exports.signUp = async (req, res) => 
{
    const {body}    = req;
    const {error}   = UserValidation(body);

    if (error) return res.status(401).json(error.details[0].message);

    UserModel.create({...body})
        .then(() => {res.status(201).json({ message: 'User added !'});})
        .catch(error => res.status(500).json(error))
}

// ===================================================
// login
// ===================================================
exports.login = async (req, res) => 
{
    const {email, password} = req.body;

    try
    {
        const user = await UserModel.login(email, password);
        const token = createToken(user.id);

        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
        res.status(200).json({user: user.id});
    } 
    catch (error) 
    {
        res.status(400).json(error);
    }
}

// ===================================================
// logout
// ===================================================
exports.logout = (req, res) => 
{
    res.cookie('jwt', '', {maxAge : 1});
    res.redirect('/');
}