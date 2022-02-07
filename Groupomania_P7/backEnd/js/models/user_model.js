const Sequelize = require('sequelize');
const db        = require('../../config/db');

// ===================================================
//                 User Model
// ===================================================
const user = db.define('user', 
{
    id : 
    {
        type            : Sequelize.DataTypes.INTEGER.UNSIGNED,
        primaryKey      : true,
        autoIncrement   : true,
        allowNull       : false
    },
    first_name : 
    {
        type            : Sequelize.DataTypes.STRING(50),
        allowNull       : false
    },
    last_name : 
    {
        type            : Sequelize.DataTypes.STRING(50),
        allowNull       : false
    },
    email : 
    {
        type            : Sequelize.DataTypes.STRING(100),
        allowNull       : false,
        validate        : {isEmail:true},
        unique          : {args: true, msg: 'Email address already in use! '}
    },
    password : 
    {
        type            : Sequelize.DataTypes.STRING(255),
        allowNull       : false
    },
    avatar_url : 
    {
        type            : Sequelize.DataTypes.STRING,
        defaultValue    : "../../resources/default_avatar.png",
        allowNull       : true
    },
    moderator : 
    {
        type            : Sequelize.DataTypes.BOOLEAN,
        defaultValue    : false,
        allowNull       : false
    },

});

// ===================================================
//                 User Export
// ===================================================
module.exports = user;