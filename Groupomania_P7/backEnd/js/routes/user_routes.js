const router = require('express').Router();
const authController = require('../controllers/auth_controller');
const userController = require('../controllers/user_controller');

// ===================================================
//                 Routes Definitions
// ===================================================
router.post('/signup', authController.signUp); 
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/getAll', userController.getUsers);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);


// ===================================================
//                   Routes Export
// ===================================================
module.exports = router;