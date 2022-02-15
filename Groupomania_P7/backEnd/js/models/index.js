const Sequelize = require('sequelize');
const db        = require('../../config/db');

const PostModel = require('./post_model');
const CommentModel = require('./comment_model');

const post_comment_db = {};

post_comment_db.Sequelize   = Sequelize;
post_comment_db.sequelize   = db;
post_comment_db.post        = PostModel;
post_comment_db.comment     = CommentModel;

post_comment_db.comment.belongsToMany(post_comment_db.post, {
    through: "post_tag",
    as: "posts",
    foreignKey: "comment_id",
  });

post_comment_db.post.belongsToMany(post_comment_db.comment, {
through: "comment_tag",
as: "comments",
foreignKey: "post_id",
});


module.exports = post_comment_db;