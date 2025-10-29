const express = require('express');
const router = express.Router();
const Quote = require('../controllers/QuoteController');

router.get('/mood/:mood', Quote.getRandomQuote);
router.get('/user', Quote.getQuotesByUserId);
router.delete('/:quoteId', Quote.delelteQuoteById);
router.put('/:quoteId', Quote.updateQuoteById);
const isAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Not logged in" });
  }
  next();
};
router.post('/add',isAuth, Quote.addQuote);



module.exports = router;