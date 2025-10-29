const mongoose = require('mongoose');
const Diary = require('../module/Diary');


const createDiary = async (req, res) => {
    const {content} = req.body;
    try {
        const newDiary = new Diary({content, user: req.session.userId });
        await newDiary.save();
        res.status(201).json(newDiary);
    }   catch (error) {
        console.error('Error creating diary:', error);
        res.status(500).json({ message: "Server error" });
    }
};

const getDiariesByUserId = async (req, res) => {
    userId = req.session.userId; 
    try {
        const diaries = await Diary.find({ user:userId });
        res.status(200).json(diaries);
    } catch (error) {
        console.error('Error fetching diaries:', error);
        res.status(500).json({ message: "Server error" });
    }   
};

module.exports = { createDiary , getDiariesByUserId};