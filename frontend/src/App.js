import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import AddQuote from './pages/AddQuote';
import Settings from './pages/Setting';
import Profile from './pages/Profile';
function App() {
  return (
    <Router>
      <NavbarWrapper />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add-quote" element={<AddQuote />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
       
      </Routes>
    </Router>
  );
}

// Navbar only shows on pages except Login
function NavbarWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/register"];
   if (hideNavbarPaths.includes(location.pathname)) return null;//hide nav bar 

  

  const handleLogout = () => {
    window.location.href = "/"; // go back to login
  };

  return <Navbar handleLogout={handleLogout} />;
}

export default App;
