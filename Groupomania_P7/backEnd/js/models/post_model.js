const Sequelize     = require('sequelize');
const db            = require('../../config/db');
const CommentModel  = require("./comment_model");
const UserModel     = require("./user_model");

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


postSchema.hasMany(CommentModel, { as: "comments" });

// ===================================================
//                 Post Export
// ===================================================
module.exports = postSchema ;