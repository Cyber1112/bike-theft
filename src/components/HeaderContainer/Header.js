import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  let isAuth = false;
  if (localStorage.getItem("bikeTheftAuthorization") !== null) {
    isAuth = JSON.parse(localStorage.getItem("bikeTheftAuthorization")).isAuth;
  }
  const onExitButtonClicked = () => {
    localStorage.setItem(
      "bikeTheftAuthorization",
      JSON.stringify({ token: null, isAuth: false })
    );
    window.location.reload(false);
  };
  return (
    <>
      <div className="header-container">
        <h3 className="header-container_logo">
          <NavLink to="/">BICYCLE TRACKER</NavLink>
        </h3>
        <div className="header-container_info">
          <ul>
            {isAuth ? (
              <>
                <NavLink to="/report-list">
                  <li>
                    <button>Stolen Bikes</button>
                  </li>
                </NavLink>
                <li>
                  <button onClick={onExitButtonClicked}>Sign Out</button>
                </li>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <li>
                    <button className="btn btn-login">Log in</button>
                  </li>
                </NavLink>
                <NavLink to="/signup">
                  <li>
                    <button className="btn btn-signup">Sign up</button>
                  </li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Header;
