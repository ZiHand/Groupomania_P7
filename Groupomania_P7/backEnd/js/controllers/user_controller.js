const UserModel = require('../models/user_model');
const UserValidation = require('../validations/user_validation');

// ===================================================
// createUser
// ===================================================
exports.createUser = (req, res, next) => 
{
    const {body} = req;
    const {error} = UserValidation(body);

    if (error) return res.status(401).json(error.details[0].message);
}

// ===================================================
// logUser
// ===================================================
exports.logUser = (req, res, next) => 
{
}

// ===================================================
// getUsers
// ===================================================
exports.getUsers = (req, res, next) => 
{
}

// ===================================================
// getUser
// ===================================================
exports.getUser = (req, res, next) => 
{
}

// ===================================================
// updateUser
// ===================================================
exports.updateUser = (req, res, next) => 
{
}

// ===================================================
// deleteUser
// ===================================================
exports.deleteUser = (req, res, next) => 
{
}