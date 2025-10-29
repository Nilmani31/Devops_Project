const express = require('express');
const router = express.Router();
const Diary = require('../controllers/DiaryController');
const isAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }
  next();
};

router.post('/create',isAuth, Diary.createDiary);
router.get('/user', Diary.getDiariesByUserId);
module.exports = router;
