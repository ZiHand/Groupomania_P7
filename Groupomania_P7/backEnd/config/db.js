const { Sequelize } = require('sequelize');
require('dotenv').config({path: './config/.env'});

// ===================================================
//               Sequelize Connection
// ===================================================
const sequelize = new Sequelize("groupomania", process.env.DB_USER, process.env.DB_PASS, {dialect: "mysql", host: "localhost"});

// ===================================================
//                Sequelize Export
// ===================================================
module.exports = sequelize;

const UserModel         = require('../js/models/user_model');
//const ModeratorModel    = require('../js/models/moderator_model');
const PostModel         = require('../js/models/post_model');
const CommentModel      = require('../js/models/comment_model');


/*const db = {};

db.Sequelize   = Sequelize;
db.sequelize   = sequelize;

db.user        = require("../js/models/user_model");(sequelize, Sequelize);
db.post        = require('../js/models/post_model');(sequelize, Sequelize);
db.comment     = CommentModel;
db.moderator   = ModeratorModel;*/

// We use hasMany() to help one User have many Posts, 
// and belongsTo() to indicate that one Post only belongs to one User.
//UserModel.hasMany(PostModel, { as: "posts" });
//PostModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" });

/*db.post.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.post, { foreignKey: "postId", as: "post" });

db.user.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.user, { foreignKey: "userId", as: "user" });

db.user.belongsTo(db.moderator, { foreignKey: "modId", as: "moderator" });
db.moderator.belongsTo(db.user, { foreignKey: "userId", as: "user" });

module.exports = db;*/

