const express = require('express')
const router = express.Router() 
const { createNote, getAllNotes, getNote, updateNote, deleteNote, getMyNotes, adminUpdateNote, adminDeleteNote } = require('../controllers/noteController');
const authGuard = require('../middlewares/authGuard');
const adminGuard = require('../middlewares/adminGuard');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

router.post('/create', upload.single('file'), authGuard, createNote);
router.get('/all', getAllNotes);
router.get('/admin/all',authGuard, adminGuard, getAllNotes);
router.get('/my', authGuard, getMyNotes);
router.get('/:id', authGuard, getNote);
router.put('/:id',upload.single('file'), authGuard, updateNote);
router.put('/admin/:id',upload.single('file'), authGuard, adminGuard, adminUpdateNote);
router.delete('/:id',authGuard, deleteNote);
router.delete('/admin/:id',authGuard, adminGuard, adminDeleteNote);

module.exports = router;