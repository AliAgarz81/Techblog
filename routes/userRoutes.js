const express = require('express')
const router = express.Router() 
const { registerUser, loginUser, userProfile, updateUser, deleteUser, logoutUser } = require('../controllers/userController');
const authGuard = require('../middlewares/authGuard');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', authGuard, userProfile);
router.put('/update', authGuard, updateUser);
router.delete('/delete',authGuard, deleteUser);

module.exports = router;