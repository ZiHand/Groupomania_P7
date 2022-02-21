const UserModel         = require('../models/user_model');
const UserValidation    = require('../validations/user_validation');
const bcrypt            = require("bcrypt");
const { updateErrors } = require('../utils/errors_utils');


// ===================================================
// getUsers
// ===================================================
module.exports.getUsers = (req, res) => 
{
    UserModel.findAll({attributes : {exclude : ["createdAt", "updatedAt", "password"]}})
        .then( users =>
        {
            res.status(200).json(users);
        })
        .catch(error => res.status(500).json(error))
}

// ===================================================
// getUser
// ===================================================
module.exports.getUser = (req, res) => 
{
    const {id} = req.params;

    UserModel.findByPk(id, {attributes : {exclude : ["createdAt", "updatedAt", "password"]}})
    .then(user =>
    {
        if (!user)
        {
            return res.status(400).json({message : `User not found : ${id}`})
        }

        return res.status(200).json(user);
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// updateUser TODO:Check how to pass file
// ===================================================
module.exports.updateUser = (req, res) => 
{
    const {body}    = req;

    if (!req.params.id)
        return res.status(400).send("ID unknown : " + req.params.id);

    console.log(body.pseudo);
    console.log(body.password);


    UserModel.findByPk(req.params.id, {attributes : {exclude : ["createdAt", "updatedAt", "password"]}})
    .then(user =>
    {
        if (!user)
        {
            return res.status(404).json({message : "User not found !"})
        }

        // Mean no image selected
        if (!req.file)
        {
            if (req.params.id !== user.id)
            {
                badStatus = 403;
                errorMsg = " unauthorized request";
                throw(errorMsg);
            }

            if (body.pseudo)
            {
                user.pseudo = body.pseudo;
            }

            if (body.password)
            {
                const salt = bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(body.password, salt);
            }
        }
        else
        {

        }

        console.log(JSON.stringify(user));

        return user;
    })
    .then(updateUser =>
    {
        // Update
        updateUser.save()
        .then(() =>
        {
            res.status(201).json({ message: 'User updated.'})
        })
        .catch(error =>
        {
            const errors = updateErrors(error);
            res.status(200).json({ errors });
        });
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// deleteUser
// ===================================================
module.exports.deleteUser = (req, res) => 
{
    const {id} = req.params;

    UserModel.destroy({where : {id : id}})
    .then(user =>
    {
        if (!user)
        {
            res.status(404).json({ message: 'User not found !'})
        }

        res.status(200).json({ message: 'User deleted.'})
    })
    .catch(error => res.status(500).json(error))
}