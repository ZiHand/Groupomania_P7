const router = require('express').Router();
const postController = require('../controllers/post_controller');

// ===================================================
//                 Routes Definitions
// ===================================================
router.post('/', postController.createPost); 
router.get('/getAll', postController.getPosts); 
router.get('/:id', postController.getPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.post('/:postid/:commentid', postController.addComment);


// ===================================================
//                   Routes Export
// ===================================================
module.exports = router;