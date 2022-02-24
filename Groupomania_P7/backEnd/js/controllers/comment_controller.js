const CommentModel         = require('../models/comment_model');
const PostModel            = require('../models/post_model');
const UserModel            = require('../models/user_model');
const CommentValidation    = require('../validations/post_validation');

// ===================================================
// createComment
// ===================================================
module.exports.createComment = (req, res) => 
{
    const {postId, userId}  = req.params;
    const {body}            = req;
    const {error}           = CommentValidation(body);

    if (error) return res.status(401).json(error.details[0].message);

    // Check empty post
    if (body.message.length == 0)
    {
        res.status(200).json({ message :"No empty comment allowed" });
        return;
    }

    // Check if owner id is valid
    let User;
    let Post;

    // Find corresponding user:
    UserModel.findByPk(userId, {attributes : {exclude : ["createdAt", "updatedAt", "password"]}})
    .then(user =>
    {
        if (!user)
        {
            return res.status(400).json({message : `User not found : ${userId}`})
        }

        User = user;
    })
    .catch(error => res.status(500).json(error))

    // Find corresponding post:
    PostModel.findByPk(postId, {attributes : {exclude : ["createdAt", "updatedAt"]}})
    .then(post =>
    {
        if (!post)
        {
            return res.status(400).json({message : `Post not found : ${postId}`})
        }

        Post = post;
    })
    .catch(error => res.status(500).json(error))



    CommentModel.create({...body})
        .then((comment) => 
        {
            //console.log("User : " + JSON.stringify(User));
            comment.setUser(User);
            //console.log("Comment : " + JSON.stringify(comment));
            comment.setPost(Post);
            res.status(201).json({ message: `Comment added : ${comment.id}`});
        })
        .catch(error =>
        {
            //const errors = signUpErrors(error);
            res.status(200).json({ error });
        });
}

// ===================================================
// getPosts
// ===================================================
module.exports.getComments = (req, res) => 
{
    CommentModel.findAll(
    {
        include: [UserModel, PostModel]
    })
    .then( comments =>
    {
        res.status(200).json(comments);
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// getComment
// ===================================================
module.exports.getComment = (req, res) => 
{
    const {id} = req.params;

    CommentModel.findByPk(id,
    {
        include: [
            {
              model: PostModel,
              as: "post",
              attributes: ["id"],
            },
            {
                model: UserModel,
                as: "user",
                attributes: ["id", "pseudo", "avatar_url"],
              },
          ],

          //include: [UserModel, PostModel]
    })
    .then(comment =>
    {
        if (!comment)
        {
            return res.status(400).json({message : `Comment not found : ${id}`})
        }

        return res.status(200).json(comment);
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// updateComment
// ===================================================
module.exports.updateComment = (req, res) => 
{
    CommentModel.findByPk(req.params.id)
    .then(comment =>
    {
        if (!comment)
        {
            return res.status(404).json({message : "Comment not found !"})
        }

        if (req.params.id !== comment.id)
        {
            badStatus = 403;
            let errorMsg = " unauthorized request";
            throw(errorMsg);
        }

        comment.message    = req.body.message;

        return comment;
    })
    .then(comment =>
    {
        // Update
        comment.save()
        .then(() =>
        {
            res.status(201).json({ message: 'Comment updated.'})
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// deleteComment
// ===================================================
module.exports.deleteComment = (req, res) => 
{
    const {id} = req.params;

    CommentModel.destroy({where : {id : id}})
    .then(comment =>
    {
        if (!comment)
        {
            res.status(404).json({ message: 'Comment not found !'})
        }

        res.status(200).json({ message: 'Comment deleted.'})
    })
    .catch(error => res.status(500).json(error))
}