import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include"
    });
    const data = await res.json();
    if (res.ok ) {
      alert('Successfully logged in');
      navigate("/home");
       
    } else {
      alert(data.message || "Login failed");
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong!");
  }
};


  return (
    <div className="login-page">
        <div className="login-container">
      <h2 className="login-h2">Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
      <div className="login-link" onClick={() => navigate("/register")}>
        Don't have an account? Register
      </div>
    </div>

    </div>
    
  );
}

export default Login;
