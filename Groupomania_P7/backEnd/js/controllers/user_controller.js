const UserModel         = require('../models/user_model');
const UserValidation    = require('../validations/user_validation');


// ===================================================
// createUser
// ===================================================
exports.createUser = (req, res, next) => 
{
    const {body} = req;
    const {error} = UserValidation(body);

    if (error) return res.status(401).json(error.details[0].message);

    UserModel.create({...body})
        .then(() => {res.status(201).json({ message: 'User added !'});})
        .catch(error => res.status(500).json(error))
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
    UserModel.findAll({attributes : {exclude : ["createdAt", "updatedAt"]}})
        .then( users =>
        {
            res.status(200).json(users);
        })
        .catch(error => res.status(500).json(error))
}

// ===================================================
// getUser
// ===================================================
exports.getUser = (req, res, next) => 
{
    const {id} = req.params;

    UserModel.findByPk(id, {attributes : {exclude : ["createdAt", "updatedAt"]}})
    .then(user =>
    {
        if (!user)
        {
            return res.status(404).json({message : "User not found !"})
        }

        return res.status(200).json(user);
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// updateUser TODO:Check how to pass file
// ===================================================
exports.updateUser = (req, res, next) => 
{
    UserModel.findByPk(req.params.id, {attributes : {exclude : ["createdAt", "updatedAt"]}})
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
exports.deleteUser = (req, res, next) => 
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