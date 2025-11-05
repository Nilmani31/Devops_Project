
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
      alert("Unable to load user data");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = async () => {
    if (!newEmail) return alert("Please enter a new email");
    setUpdating(true);
    try {
      const res = await fetch("http://localhost:4000/api/users/update-email", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: newEmail }),
      });

      if (!res.ok) throw new Error("Failed to update email");
      alert(`✅ Email updated successfully to: ${newEmail}`);
      setNewEmail("");
      fetchUserData();
    } catch (error) {
      console.error(error);
      alert("Error updating email");
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!newPassword) return alert("Please enter a new password");
    setUpdating(true);
    try {
      const res = await fetch("http://localhost:4000/api/users/update-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: newPassword }),
      });

      if (!res.ok) throw new Error("Failed to update password");
      alert("✅ Password updated successfully!");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      alert("Error updating password");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="settings-container">
      <div className="left-side">
        <img src={SettingsImage} alt="Decorative" />
      </div>

      <div className={`settings-card ${isFlipped ? "flipped" : ""}`}>
       
        <div className="front">
          <h2>Your Profile</h2>
          <p><strong>Email:</strong> {userData?.email}</p>
          <p><strong>Username:</strong> {userData?.username}</p>
          <button className="flip-button" onClick={() => setIsFlipped(true)}>
            Edit Settings
          </button>
        </div>

       
        <div className="back">
          <h2>Update Settings</h2>

          <div className="form-group">
            <label>New Email</label>
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
              Change Email
            </button>
          </div>

          <div className="form-group">
            <label>New Password</label>
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
              Change Password
            </button>
          </div>

          <button className="flip-button" onClick={() => setIsFlipped(false)}>
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

