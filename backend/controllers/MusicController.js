const mongoose = require('mongoose');
const Music = require('../module/Music');


const getRandomMusic = async (req, res) => {
    const { mood } = req.params;             
    try {
        const musics = await Music.find({ mood });
        if (musics.length === 0) {
            return res.status(404).json({ message: "No music found for this mood" });
        }
        const randomIndex = Math.floor(Math.random() * musics.length);
        const randomMusic = musics[randomIndex];
        res.status(200).json(randomMusic);
    }
    catch (error) {
        console.error('Error fetching music:', error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { getRandomMusic };