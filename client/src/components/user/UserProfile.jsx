import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";

function UserProfile() {
  const { currentUser } = useContext(userAuthorContextObj);
  
  return (
    <div>
      <ul className="d-flex justify-content-around list-unstyled fs-1">
        <li className="nav-item">
          <Link to="articles" className="nav-link">
            Articles
          </Link>
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

export default UserProfile;
