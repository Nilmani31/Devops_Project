import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerImage from "../assets/registerpage.jpeg";
import "./RegisterPage.css";
import axios from "axios";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange =  (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
       await axios.post('http://localhost:4000/api/users/register', {
        email : formData.email,
        password : formData.password,
        username : formData.name
      });
      alert("Registration successful! Please log in.");
      navigate("/home");
    } catch (error) {
      alert("something went wrong!");;
    }
  };
  return (
    <div className="register-container">
        
      <div className="register-image-section">
        <img src={registerImage} alt="Register" />
      </div>
      
      <div className="register-form-section">
        <div className="register-card">
          <h2>Create Your Account</h2>
          <p>Join us make you days more special!</p>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              className="register-input"
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="register-input"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="register-input"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              className="register-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button className="register-button" type="submit">
              Register
            </button>
          </form>
          <p className="register-login-link">
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default RegisterPage;
