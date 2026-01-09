import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";


const moods = ["Happy", "Sad", "Motivated", "Angry"];



const Home = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [diaryEntry, setDiaryEntry] = useState("");
  const [musicList, setMusicList] = useState([]);
  const [quotes, setQuotes] = useState([]);
  
  const handleSaveDiary = async(e) => {
    e.preventDefault();
    if (diaryEntry.trim() === "") {
      alert("Write something before saving!");
      return;
    }
    try{
      await axios.post('http://localhost:4000/api/diaries/create', {
        content : diaryEntry,
    },{ withCredentials: true });  
    } catch (error) {
      alert("something went wrong!");;
    }
    alert("Your diary entry has been saved! (Check console)");
    setDiaryEntry("");
  };

  useEffect(() => {
    if (selectedMood) {
      
      const fetchMusic = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/music/mood/${selectedMood}`);
          setMusicList([res.data]); 
        } catch (err) {
          console.error(err);
          setMusicList([]);
        }
      };
      fetchMusic();
    }
  }, [selectedMood]);

    useEffect(() => {
    if (selectedMood) {
      
      const fetchQuotes = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/api/quotes/mood/${selectedMood}`);
          setQuotes([res.data]); 
        } catch (err) {
          console.error(err);
          setQuotes([]);
        }
      };
      fetchQuotes();
    }
  }, [selectedMood]);



  return (
    <div className="home-page">
     
      <div className="left-content">
        <h1>How are you feeling today?</h1>

        <div className="mood-selection">
          {moods.map((mood) => (
            <button
              key={mood}
              className={`mood-btn ${selectedMood === mood ? "active" : ""}`}
              onClick={() => setSelectedMood(mood === selectedMood ? null : mood)}
            >
              {mood}
            </button>
          ))}
        </div>
        {!selectedMood && (
          <div className="motivation-message">
            <h2>✨ Welcome to Your Mood Journal ✨</h2>
            <p>
              Select a mood to discover uplifting music, inspirational quotes, 
              and write down your feelings.  
            </p>
            <p className="big-quote">
              "Your emotions are valid. Let's explore them together."
            </p>
          </div>
        )}

        {selectedMood && (
          <div className="mood-content">
            <div className="quotes-section">
              <h2>Inspirational Quotes</h2>
              {quotes.length === 0 ? (
                  <li>No music found for this mood</li>
                ) : (
                  quotes.map((quote, idx) => (
                    <p key={idx} className="quote">
                      "{quote.quote}"
                    </p>
                  ))
                )}
              
            </div>

            <div className="music-section">
              <h2>Music for your mood</h2>
              <ul>
                {musicList.length === 0 ? (
                  <li>No music found for this mood</li>
                ) : (
                  musicList.map((song, idx) => (
                    <li key={idx}>
                      <a href={song.link} target="_blank" rel="noopener noreferrer">
                        {song.title}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

     
<div className="right-image">
  <div className="diary-card">
    <h2>Mood Diary</h2>
    <textarea
      placeholder="Write about why you feel this way..."
      value={diaryEntry}
      onChange={(e) => setDiaryEntry(e.target.value)}
    />
    <button onClick={handleSaveDiary}>Save Entry</button>
  </div>
</div>

    </div>
  );
};

export default Home;
