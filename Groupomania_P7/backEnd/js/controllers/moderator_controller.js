const ModeratorModel = require('../models/moderator_model');

// ===================================================
// getModerators
// ===================================================
module.exports.getModerators = (req, res) => 
{
    ModeratorModel.findAll({attributes : {exclude : ["createdAt", "updatedAt"]}})
        .then( modos =>
        {
            res.status(200).json(modos);
        })
        .catch(error => res.status(500).json(error))
}

// ===================================================
// getModerator
// ===================================================
module.exports.getModerator = (req, res) => 
{
    const {id} = req.params;

    ModeratorModel.findByPk(id, {attributes : {exclude : ["createdAt", "updatedAt"]}})
    .then(modo =>
    {
        if (!modo)
        {
            return res.status(400).json({message : `User not found : ${id}`})
        }

        return res.status(200).json(modo);
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// deleteModerator
// ===================================================
module.exports.deleteModerator = (req, res) => 
{
    const {id} = req.params;

    UserModel.destroy({where : {id : id}})
    .then(modo =>
    {
        if (!modo)
        {
            res.status(404).json({ message: 'Moderator not found !'})
        }

        res.status(200).json({ message: 'Moderator deleted.'})
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================