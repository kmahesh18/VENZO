import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext.jsx";
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import logo from "../../assets/logo.png";
function Header() {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const handleSignout = async () => {
    await signOut();
    localStorage.removeItem("currentuser");
    localStorage.clear();
    setCurrentUser(null);
    navigate("/");
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="header">
      <nav>
        <div className="nav-left">
          <Link to="/" className="logo-section">
            <img
              src={logo}
              alt="logo"
              className="logo"
            />
            <span className="site-title">VENZO</span>
          </Link>
          
          <div className="nav-links">
            <Link to="/" className="link">Home</Link>
            {!isSignedIn && (
              <>
                <Link to="/signin" className="link">Sign In</Link>
                <Link to="/signup" className="link">Sign Up</Link>
              </>
            )}
          </div>
        </div>

        <div className="nav-right">
          {isSignedIn && (
            <div className="user-profile-section">
              <div className="user-info">
                <img
                  src={user.imageUrl}
                  alt=""
                  className="author-avatar"
                />
                <div className="author-info">
                  <span className="author-name">{user.firstName}</span>
                  <span className="role-badge">{currentUser?.role}</span>
                </div>
              </div>
              <button className="custom-btn" onClick={handleSignout}>
                Sign Out
              </button>
            </div>
          )}
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
