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
        type            : Sequelize.UUID,
        defaultValue    : Sequelize.UUIDV4,
        primaryKey      : true,
        allowNull       : false
    },
    pseudo : 
    {
        type            : Sequelize.DataTypes.STRING(15),
        allowNull       : false,
        unique          : {args: true, msg: 'Pseudo already in use! '}
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
    console.log("validPassword");
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

// ===================================================
//                 User Export
// ===================================================
module.exports = userSchema ;