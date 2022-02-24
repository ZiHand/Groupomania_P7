const Sequelize = require('sequelize');
//import Log from './../../../frontend/src/components/log/index';
const db        = require('../../config/db');
const bcrypt    = require("bcrypt");
const PostModel = require('./post_model');
const CommentModel = require('./comment_model');
const ModeratorModel = require('./moderator_model');

// ===================================================
//                 User Model
// ===================================================
const userSchema = db.define('users', 
{
    id : 
    {
        type            : Sequelize.UUID,
        defaultValue    : Sequelize.UUIDV4,
        primaryKey      : true,
        allowNull       : false
    },
    pseudo : 
    {
        type            : Sequelize.DataTypes.STRING(15),
        allowNull       : false,
        unique          : {args: true, msg: 'unique_pseudo'}
    },
    email : 
    {
        type            : Sequelize.DataTypes.STRING(100),
        allowNull       : false,
        validate        : {isEmail:true},
        unique          : {args: true, msg: 'unique_email'}
    },
    password : 
    {
        type            : Sequelize.DataTypes.STRING(255),
        allowNull       : false
    },
    avatar_url : 
    {
        type            : Sequelize.DataTypes.STRING,
        defaultValue    : "default_avatar2.png",
        allowNull       : true
    },
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

        beforeDestroy:async (user) => 
        {
            if (user.password) 
            {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    },

    /*instanceMethods: 
    {
        validPassword: (password) => 
        {
            return bcrypt.compareSync(password, this.password);
        }
    }*/
});

// Adding an instance level method ASK PASCAL
userSchema.prototype.validPassword = function(password, hash) 
{
    return bcrypt.compareSync(password, this.password);
};

// Static methode
userSchema.login = async function (email, password)
{
    const user = await this.findOne({ where: { email: email } });
    
    if (!user)
    {
        throw new Error("email");
    }

    /*if (!this.validPassword(password, user.password))
    {
        throw("Incorrect password.");
    }*/

    if (!bcrypt.compareSync(password, user.password)) // Should use validPassword() func / not working
    {
        throw new Error("password");
    }

    return user;
};

//userSchema.hasMany(PostModel, { as: "posts" });
//userSchema.hasMany(CommentModel, { as: "comments" });
//userSchema.belongsTo(ModeratorModel, { foreignKey: "modId", as: "moderator" });

// ===================================================
//                 User Export
// ===================================================
module.exports = userSchema ;