const Sequelize = require('sequelize');
const db        = require('../../config/db');
const bcrypt    = require("bcrypt");

// ===================================================
//                 User Model
// ===================================================
const userSchema = db.define('users', 
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
    }
},
{
    hooks: 
    {
        beforeCreate: async (user) => 
        {
            if (user.password) 
            {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        beforeUpdate:async (user) => 
        {
            if (user.password) 
            {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    },

    instanceMethods: 
    {
        validPassword: (password) => 
        {
            return bcrypt.compareSync(password, this.password);
        }
    }
});

// ===================================================
//                 User Export
// ===================================================
module.exports = userSchema ;