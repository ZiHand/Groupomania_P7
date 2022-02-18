const Sequelize = require('sequelize');
const db        = require('../../config/db');

// ===================================================
//                Moderator Model
// ===================================================
const moderatorSchema = db.define('moderators', 
{
    id : 
    {
        type            : Sequelize.UUID,
        defaultValue    : Sequelize.UUIDV4,
        primaryKey      : true,
        allowNull       : false
    },
    userId : 
    {
        type            : Sequelize.UUID,
        allowNull       : false
    },
});

// ===================================================
//                Moderator Export
// ===================================================
module.exports = moderatorSchema ;