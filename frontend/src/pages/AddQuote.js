import React, { useState } from "react";
import "./AddQuote.css";
import sideImage from "../assets/quoetpage.jpeg"; 
import axios from "axios";

const AddQuote = () => {
  const [mood, setMood] = useState("");
  const [quote, setQuote] = useState("");
  

  const handleSubmit =  async (e) => {
    e.preventDefault();
    if (!mood || !quote) {
      alert("✍️ Please fill in both mood and quote before submitting!");
      return;
    }
    try{
      await axios.post('http://localhost:4000/api/quotes/add', {
        mood : mood,
        quote : quote,
    },{ withCredentials: true });
    } catch (error) {
      alert("❌ Oops! We couldn't save your quote. Please try again!");
    }
    setMood("");
    setQuote("");
    alert("✨ Awesome! Your quote has been added successfully! Keep inspiring!");
  
  };

  return (
    <div className="add-quote-page">
      
      <div className="form-left">
        <h2 className="quote-title">✨ Share Your Thoughts ✨</h2>
        <form className="quote-form" onSubmit={handleSubmit}>
          <label htmlFor="mood">Mood</label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
          >
            <option value="">-- Select Your Mood --</option>
            <option value="Happy">😊 Happy</option>
            <option value="Angry">😠 Angry</option>
            <option value="Sad">😢 Sad</option>
            <option value="Motivated">💪 Motivated</option>
          </select>

          <label htmlFor="quote">Your Quote</label>
          <textarea
            id="quote"
            rows="4"
            placeholder="Write something uplifting..."
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
          ></textarea>

          <button type="submit" className="submit-btn">🌟 Add Quote 🌟</button>
        </form>
      </div>

      
      <div className="image-right">
        <img src={sideImage} alt="Motivation" />
      </div>
    </div>
  );
};

export default AddQuote;
