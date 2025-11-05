import React, { useState,useEffect } from "react";
import "./Profile.css";


const Profile = () => {
  
  const [quotes, setQuotes] = useState([]);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedQuote, setEditedQuote] = useState("");
  useEffect(() => {
    getuserQuotes();
    getuserDiaryEntries();
  }, []);//this part use to load page when changing happense in qute or diary
  const getuserQuotes = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/quotes/user", {
        method: "GET",
        credentials: "include", 
      });
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      } else {
        console.error("Failed to fetch quotes");
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };
  const getuserDiaryEntries = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/diaries/user", {  
        method: "GET",
        credentials: "include", 
      });
      if (response.ok) {
        const data = await response.json();
        setDiaryEntries(data);
      }
      else {
        console.error("Failed to fetch diary entries");
      }
    } catch (error) {
      console.error("Error fetching diary entries:", error);
    }
  };
 
  const handledelete = async (index,quoteId) => {
    try{
      const res = await fetch(`http://localhost:4000/api/quotes/${quoteId}`, {
        method: "DELETE",
        credentials: "include", 
      });
      if (res.ok) {
        const newQuotes = quotes.filter((_, i) => i !== index);
        setQuotes(newQuotes);
      } else {
        console.error("Failed to delete quote");
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedQuote(quotes[index].quote);
    
  };
  const handleSave = async (quoteId) => {
    try{
      const res = await fetch(`http://localhost:4000/api/quotes/${quoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({ quote: editedQuote }),
      });
      if (res.ok) {
        setQuotes((prevQuotes) =>
          prevQuotes.map((q, i) =>
            q._id === quoteId ? { ...q, quote: editedQuote } : q
          )
        );
      }
      else {
        console.error("Failed to update quote");
      }
    } catch (error) {
      console.error("Error updating quote:", error);
    }
    setEditingIndex(null);
    setEditedQuote("");
  }

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="profile-right">
        </div>
        
        <div className="profile-left">
          <h1>Your Profile</h1>

          <div className="profile-section">
            <h2>My Quotes</h2>
            {quotes.length === 0 ? (
              <p>No quotes added yet.</p>
            ) : (
              <ul>
                {quotes.map((q,idx) => (
                  <li key={q._id} className="quote-item">
                    <span className="mood-label">{q.quote}</span>: {""}
                    {editingIndex === idx ? (
                      <input
                        type="text"
                        value={editedQuote}
                        onChange={(e) => setEditedQuote(e.target.value)}
                        className="edit-input"
                      />
                    ) : (
                      q.quote
                    )}
                    <div className="action-buttons">
                      {editingIndex === idx ? (
                        <button onClick={()=>handleSave(q._id)} className="save-btn">
                          ✅
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(idx)}
                          className="edit-btn"
                        >
                          ✏️
                        </button>
                      )}
                      <button
                        onClick={() => handledelete(idx,q._id)}
                        className="delete-btn"
                      >
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
                
              </ul>
            )}
          </div>

          <div className="profile-section">
            <h2>My Diary Entries</h2>
            {diaryEntries.length === 0 ? (
              <p>No diary entries yet.</p>
            ) : (
              <ul>
                {diaryEntries.map((d, idx) => (
                  <li key={idx}>
                    <span className="mood-label">{d.date}</span>: {d.content}
                  </li>
                ))}
              </ul>
            )}
          </div>

          
        </div>

       
        
      </div>
    </div>
  );
};

export default Profile;
