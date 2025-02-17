import React from "react";
import { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext.jsx";
import { adminContextObj } from "../../contexts/AdminContext.jsx";
import { useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getBaseUrl } from '../../utils/config';

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { currentAdmin, setCurrentAdmin } = useContext(adminContextObj);

  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // console.log("isSignedIn :", isSignedIn);
  console.log("user :", user);
  // console.log("isLoaded :", isLoaded);

  async function onSelectRole(e) {
    //clear error property
    setError("");
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    currentAdmin.role = selectedRole;
    let res = null;
    try {
      if (selectedRole === "author") {
        res = await axios.post(
          `${getBaseUrl()}/author-api/author`,
          currentUser
        );
        let { message, payload } = res.data;
        if (message === "author") {
          setCurrentUser({
            ...currentUser,
            ...payload,
          });
          //save user to localstorage
          localStorage.setItem("currentuser", JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
      if (selectedRole === "user") {
        res = await axios.post(
          `${getBaseUrl()}/user-api/user`,
          currentUser
        );
        let { message, payload } = res.data;
        if (message === "user") {
          setCurrentUser({
            ...currentUser,
            ...payload,
          });
          //save user to localstorage
          localStorage.setItem("currentuser", JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
      if (selectedRole === "admin") {
        res = await axios.post(
          `${getBaseUrl()}/admin-api/admin`,
          currentAdmin
        );
        let { message, payload } = res.data;
        console.log(message);
        if (message === "admin") {
          setCurrentAdmin({
            ...currentAdmin,
            ...payload,
          });
          //save user to local storage
          localStorage.setItem("currentadmin", JSON.stringify(payload));
        } else {
          setError(message);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }
  console.log("current user : ", currentUser);
  console.log("current admin: ", currentAdmin);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 300);

    setCurrentUser({
      ...currentUser,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.emailAddresses[0].emailAddress,
      profileImageUrl: user?.imageUrl,
    });
    setCurrentAdmin({
      ...currentAdmin,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.emailAddresses[0].emailAddress,
      profileImageUrl: user?.imageUrl,
    });

    return () => clearTimeout(timeoutId);

  }, [isLoaded]);

  useEffect(() => {
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}/articles`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}/articles`);
    }
    if (currentAdmin?.role === "admin" && error.length === 0) {
      navigate(`/admin-profile/${currentAdmin.email}`);
    }
  }, [currentUser, currentAdmin]);

  return (
    <div className="home-container">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div>
          {isSignedIn === false && (
            <div className="hero-section">
              <div className="hero-content">
                <h1>Welcome to VENZO</h1>
                <p className="hero-subtitle">Share your stories with the world</p>
                <div className="hero-features">
                  <div className="feature-card">
                    <span className="feature-icon">✍️</span>
                    <h3>Write Articles</h3>
                    <p>Share your knowledge and experiences!!</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">👥</span>
                    <h3>Connect</h3>
                    <p>Join a community of writers and readers</p>
                  </div>
                  <div className="feature-card">
                    <span className="feature-icon">💡</span>
                    <h3>Learn</h3>
                    <p>Discover new perspectives and ideas!!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isSignedIn === true && (
            <div className="profile-section">
              <div className="profile-header">
                <div className="profile-info">
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="profile-image"
                  />
                  <div className="profile-details">
                    <h2>{user.firstName}</h2>
                    <p>{user.emailAddresses[0].emailAddress}</p>
                  </div>
                </div>
              </div>
              
              <div className="role-selection">
                <h3>Select your role</h3>
                {error && <p className="error-message">{error}</p>}
                <div className="role-options">
                  <div className="role-card" onClick={() => onSelectRole({ target: { value: 'author' }})}>
                    <input
                      type="radio"
                      name="role"
                      value="author"
                      id="author"
                      className="role-input"
                      onChange={onSelectRole}
                    />
                    <label htmlFor="author" className="role-label">
                      <span className="role-icon">✍️</span>
                      <span className="role-title">Author</span>
                      <span className="role-description">Write and publish articles</span>
                    </label>
                  </div>
                  
                  <div className="role-card" onClick={() => onSelectRole({ target: { value: 'user' }})}>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      id="user"
                      className="role-input"
                      onChange={onSelectRole}
                    />
                    <label htmlFor="user" className="role-label">
                      <span className="role-icon">📚</span>
                      <span className="role-title">User</span>
                      <span className="role-description">Read and interact with content</span>
                    </label>
                  </div>
                  
                  <div className="role-card" onClick={() => onSelectRole({ target: { value: 'admin' }})}>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      id="admin"
                      className="role-input"
                      onChange={onSelectRole}
                    />
                    <label htmlFor="admin" className="role-label">
                      <span className="role-icon">⚡</span>
                      <span className="role-title">Admin</span>
                      <span className="role-description">Manage the platform</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
