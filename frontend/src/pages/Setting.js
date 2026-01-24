
import React, { useState, useEffect } from "react";
import "./Setting.css";
import SettingsImage from "../assets/SettingPage.jpeg";

const Settings = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Generate random emojis for decoration
  const generateEmojis = () => {
    const emojis = ['☁️', '⭐', '✨', '🌟', '💫'];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 0.5,
    }));
  };

  const [emojis] = useState(generateEmojis());

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
      alert("😕 Oops! We couldn't load your profile. Please refresh the page and try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async () => {
    if (!newEmail) return alert("📧 Please enter a new email address first!");
    setUpdating(true);
    try {
      const res = await fetch("http://localhost:4000/api/users/update-email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: newEmail }),
      });

      if (!res.ok) throw new Error("Failed to update email");
      alert(`🎉 Perfect! Your email has been updated to ${newEmail}. You're all set!`);
      setNewEmail("");
      fetchUserData();
    } catch (error) {
      console.error(error);
      alert("❌ Hmm, something went wrong updating your email. Please try again or contact support!");
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword) return alert("🔐 Please enter a new password to proceed!");
    setUpdating(true);
    try {
      const res = await fetch("http://localhost:4000/api/users/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: newPassword }),
      });

      if (!res.ok) throw new Error("Failed to update password");
      alert("🔐 Excellent! Your password has been updated successfully! 🎊");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      alert("❌ Oh no! We couldn't update your password. Please check your connection and try again!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="loading">⭐ Loading...</div>;

  return (
    <div className="settings-container">
      {/* Floating emojis background */}
      <div className="emoji-background">
        {emojis.map((item) => (
          <div
            key={item.id}
            className="floating-emoji"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
              animation: `float ${item.duration}s linear ${item.delay}s infinite`,
              fontSize: Math.random() > 0.5 ? '2em' : '3em',
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div className="left-side">
        <img src={SettingsImage} alt="Decorative" />
      </div>

      <div className={`settings-card ${isFlipped ? "flipped" : ""}`}>
       
        <div className="front">
          <h2>✨ Your Profile ✨</h2>
          <p><strong>📧 Email:</strong> {userData?.email}</p>
          <p><strong>👤 Username:</strong> {userData?.username}</p>
          <button className="flip-button" onClick={() => setIsFlipped(true)}>
            ⚙️ Edit Settings
          </button>
        </div>

       
        <div className="back">
          <h2>⚙️ Update Settings ⚙️</h2>

          <div className="form-group">
            <label>📧 New Email</label>
            <input
              type="email"
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={updating}
            />
            <button
              className="setting-button"
              onClick={handleEmailChange}
              disabled={updating}
            >
              ✓ Change Email
            </button>
          </div>

          <div className="form-group">
            <label>🔐 New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={updating}
            />
            <button
              className="setting-button"
              onClick={handlePasswordChange}
              disabled={updating}
            >
              ✓ Change Password
            </button>
          </div>

          <button className="flip-button" onClick={() => setIsFlipped(false)}>
            ← Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

