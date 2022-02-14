const Sequelize = require('sequelize');
const db        = require('../../config/db');

// ===================================================
//                 Post Model
// ===================================================
const postSchema = db.define('posts', 
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
        type            : Sequelize.DataTypes.STRING(500),
        empty           : true
    },
    picture : 
    {
        type            : Sequelize.DataTypes.STRING(150),
        empty           : true
    },
    video : 
    {
        type            : Sequelize.DataTypes.STRING(200),
        empty           : true
    }
});

// ===================================================
//                 Post Export
// ===================================================
module.exports = postSchema ;