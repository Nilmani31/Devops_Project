const express = require('express');
const router = express.Router();
const {getRandomMusic} = require('../controllers/MusicController');

router.get('/mood/:mood', getRandomMusic);
module.exports = router;