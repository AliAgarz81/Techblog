const express = require('express')
const router = express.Router() 
const authGuard = require('../middlewares/authGuard');
const adminGuard = require('../middlewares/adminGuard');
const { writeComment, getComments } = require('../controllers/commentController');

router.post('/write/:id', authGuard, writeComment);
router.get('/get/:id', getComments);

module.exports = router;