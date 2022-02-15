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

const PostModel = require('../js/models/post_model');
const CommentModel = require('../js/models/comment_model');


/*const post_comment_db = {};

post_comment_db.Sequelize   = Sequelize;
post_comment_db.sequelize   = db;
post_comment_db.post        = PostModel;
post_comment_db.comment     = CommentModel;

post_comment_db.comment.belongsToMany(post_comment_db.post, 
{
    through: "post_tag",
    as: "posts",
    foreignKey: "comment_id",
});

post_comment_db.post.belongsToMany(post_comment_db.comment, 
    {
        through: "comment_tag",
        as: "comments",
        foreignKey: "post_id",
    }
);*/

