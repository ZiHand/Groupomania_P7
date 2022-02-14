const PostModel         = require('../models/post_model');
const PostValidation    = require('../validations/post_validation');

// ===================================================
// createPost
// ===================================================
module.exports.createPost = (req, res) => 
{
    const {body}    = req;
    const {error}   = PostValidation(body);

    if (error) return res.status(401).json(error.details[0].message);

    // Check empty post
    if (body.message.length == 0 && body.picture.length == 0 && body.video.length == 0)
    {
        res.status(200).json({ message :"No empty post allowed" });
        return;
    }

    // Check if owner id is valid

    PostModel.create({...body})
        .then((post) => 
        {
            res.status(201).json({ message: `Post added : ${post.id}`});
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
module.exports.getPosts = (req, res) => 
{
    PostModel.findAll()
        .then( posts =>
        {
            res.status(200).json(posts);
        })
        .catch(error => res.status(500).json(error))
}

// ===================================================
// getPost
// ===================================================
module.exports.getPost = (req, res) => 
{
    const {id} = req.params;

    PostModel.findByPk(id)
    .then(post =>
    {
        if (!post)
        {
            return res.status(400).json({message : `Post not found : ${id}`})
        }

        return res.status(200).json(post);
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// updatePost
// ===================================================
module.exports.updatePost = (req, res) => 
{
    PostModel.findByPk(req.params.id)
    .then(post =>
    {
        if (!post)
        {
            return res.status(404).json({message : "Post not found !"})
        }

        if (req.params.id !== post.id)
        {
            badStatus = 403;
            errorMsg = " unauthorized request";
            throw(errorMsg);
        }

        post.message    = req.body.message;
        post.picture    = req.body.picture;
        post.video      = req.body.video;

        return post;
    })
    .then(updatedPost =>
    {
        // Update
        updatedPost.save()
        .then(() =>
        {
            res.status(201).json({ message: 'Post updated.'})
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(500).json(error))
}

// ===================================================
// deletePost
// ===================================================
module.exports.deletePost = (req, res) => 
{
    const {id} = req.params;

    PostModel.destroy({where : {id : id}})
    .then(post =>
    {
        if (!post)
        {
            res.status(404).json({ message: 'Post not found !'})
        }

        res.status(200).json({ message: 'Post deleted.'})
    })
    .catch(error => res.status(500).json(error))
}