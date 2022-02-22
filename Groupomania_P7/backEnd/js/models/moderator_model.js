const Sequelize = require('sequelize');
const db        = require('../../config/db');
const UserModel = require('./user_model');

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
    }
});

//moderatorSchema.belongsTo(UserModel, { foreignKey: "userId", as: "user" });

// ===================================================
//                Moderator Export
// ===================================================
module.exports = moderatorSchema ;