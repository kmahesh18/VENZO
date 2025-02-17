import React, { useContext } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";

function AuthorProfile() {
  const { currentUser } = useContext(userAuthorContextObj);
  const location = useLocation();
  const isActiveRoute = (path) => location.pathname.includes(path);

  return (
    <div className="author-profile">
      <ul className="d-flex justify-content-around list-unstyled profile-nav">
        <li className="nav-item ">
          <NavLink to="articles" className={`profile-nav-button ${isActiveRoute('articles') ? 'active' : ''}`}>
            Articles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="article" className={`profile-nav-button ${isActiveRoute('articless') ? 'active' : ''}`}>
            Add new article
          </NavLink>
        </li>
      </ul>
      {currentUser.isActive ? (
        <div className="mt-5">
          <Outlet />
        </div>
      ) : (
        <p className="text-center text-danger mt-5">
          Your account is inactive. Please contact support.
        </p>
      )}
    </div>
  );
}

export default AuthorProfile;
