const router = require('express').Router();
const userController = require('../controllers/user_controller');

// ===================================================
//                 Routes Definitions
// ===================================================
router.post('/createUser', userController.createUser); 
router.post('/logUser', userController.logUser); 
router.get('/getUsers', userController.getUsers);
router.get('/getUser/:id', userController.getUser);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);


// ===================================================
//                   Routes Export
// ===================================================
module.exports = router;