const Quotes = require('../module/Quote');


const getRandomQuote = async (req, res) => {
    const { mood } = req.params;
    try {
        const quotes = await Quotes.find({ mood });
        if (quotes.length === 0) {
            return res.status(404).json({ message: "No quotes found for this mood" });
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        res.status(200).json(randomQuote);
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ message: "Server error" });
    }   
};

const addQuote = async (req, res) => {
    const { quote, mood } = req.body;        
    try {
        const newQuote = new Quotes({ quote, mood, user: req.session.userId });
        await newQuote.save();
        res.status(201).json(newQuote);
    } catch (error) {
        console.error('Error adding quote:', error);
        res.status(500).json({ message: "Server error" });
    }   
};

//get qutes by user id
const getQuotesByUserId = async (req, res) => {
  try {
    const userId = req.session.userId;  

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user logged in" });
    }

    const quotes = await Quotes.find({ user: userId });

    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error fetching quotes by user ID:', error);
    res.status(500).json({ message: "Server error" });
  }
};


const delelteQuoteById = async (req, res) => {
    const { quoteId } = req.params;
    try {   
        await Quotes.findByIdAndDelete(quoteId);
        res.status(200).json({ message: "Quote deleted successfully" });
    } catch (error) {
        console.error('Error deleting quote:', error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateQuoteById = async (req, res) => {
    const { quoteId } = req.params;
    const { quote } = req.body;    
    try {
        const updatedQuote = await Quotes.findByIdAndUpdate(
            quoteId,
            {quote},
            { new: true }
        );  
        if (!updatedQuote) {
            return res.status(404).json({ message: "Quote not found" });
        }   
        res.status(200).json(updatedQuote);
    } catch (error) {
        console.error('Error updating quote:', error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getRandomQuote, getQuotesByUserId , delelteQuoteById, updateQuoteById, addQuote };
