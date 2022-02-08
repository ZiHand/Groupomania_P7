const UserModel         = require('../models/user_model');
const UserValidation    = require('../validations/user_validation');


// ===================================================
// getUsers
// ===================================================
exports.getUsers = (req, res) => 
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
exports.getUser = (req, res) => 
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
exports.updateUser = (req, res) => 
{
    UserModel.findByPk(req.params.id, {attributes : {exclude : ["createdAt", "updatedAt", "password"]}})
    .then(user =>
    {
        if (!user)
        {
            return res.status(404).json({message : "User not found !"})
        }

        let newUser = null;

        // Mean no image selected
        if (!req.file)
        {
            if (req.body.id !== user.id)
            {
                badStatus = 403;
                errorMsg = " unauthorized request";
                throw(errorMsg);
            }

            newUser = new Sauce({...req.body});
        }
        else
        {
            if (JSON.parse(req.body.user).id !== user.userId)
            {
                badStatus = 403;
                errorMsg = "unauthorized request";
                throw(errorMsg);
            }

            newUser             = new Sauce(JSON.parse(req.body.user));
            newUser.avatar_url  = `${req.protocol}://${req.get('host')}/resources/images/${req.file.filename}`;
        }

        newUser.id = user.id;

        return newUser;

        
    })
    .then(updateUser =>
    {
        // Update
        updateUser.save()
        .then(() =>
        {
            res.status(201).json({ message: 'User updated.'})
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// deleteUser
// ===================================================
exports.deleteUser = (req, res) => 
{
    const {id} = req.params;
    console.log(req.params);

    /*UserModel.findByPk(req.params.id, {attributes : {exclude : ["createdAt", "updatedAt"]}})
    .then(user =>
    {
        if (!user)
        {
            res.status(404).json({ message: 'User not found !'})
        }

        if (user.validPassword())
        {

        }
    })
    .catch(error => res.status(500).json(error))*/

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