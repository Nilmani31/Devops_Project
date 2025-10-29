const express = require('express');
const router = express.Router();

const { loginUser, registerUser,updateEmail, updatePassword, getUser } = require('../controllers/UserController');


router.post('/login',loginUser);
router.post('/register',registerUser);
router.put('/update-email', updateEmail);
router.put('/update-password', updatePassword);
router.get('/', getUser);


module.exports = router;