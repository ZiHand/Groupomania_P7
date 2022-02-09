const Sequelize = require('sequelize');
const db        = require('../../config/db');

// ===================================================
//                 Comment Model
// ===================================================
const commentSchema = db.define('comments', 
{
    id : 
    {
        type            : Sequelize.UUID,
        defaultValue    : Sequelize.UUIDV4,
        primaryKey      : true,
        allowNull       : false
    },
    ownerId : 
    {
        type            : Sequelize.UUID,
        allowNull       : false
    },
    message : 
    {
        type            : Sequelize.DataTypes.STRING(500)
    }
});

// ===================================================
//                 Post Export
// ===================================================
module.exports = commentSchema ;