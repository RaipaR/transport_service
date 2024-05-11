// userRoutes.js
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin, getAllUsers, createUser, login, logout, deleteUser, updateUser } = require('../controllers/authController');

router.get('/', ensureAuthenticated, ensureAdmin, getAllUsers); 

router.post('/register', createUser);
router.post('/login', login);
router.post('/logout', logout);

router.put('/:id', ensureAuthenticated, updateUser);
router.delete('/:id', ensureAuthenticated, ensureAdmin, deleteUser);

module.exports = router;