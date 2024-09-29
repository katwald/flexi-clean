import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";

import {
  setNotification,
  setNotificationType,
} from "../../reducers/notificationReducer";

import { signOut } from "../../reducers/authReducer";

import Button from "../Common/Button";
import "./index.scss";

const Navigation = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(setNotification(`${user.user.firstName} logged out.`));
    dispatch(setNotificationType("success"));
    if (user) {
      return Navigate("/");
    }
  };

  const supervisor = user && user.role === "supervisor";

  const renderUserStatus = () => {
    const activeLink = ({ isActive }) =>
      isActive ? "nav-bar__nav__link__active" : "nav-bar__nav__link";
    return (
      <>
        {user &&
          (supervisor ? (
            <div className="nav-bar__nav">
              <NavLink
                onClick={closeMobileMenu}
                to={"/employees"}
                className={activeLink}
              >
                Employees
              </NavLink>
            </div>
          ) : null)}
        {user && (
          <div className="nav-bar__user-status">
            <p>
              {user.firstName} <small> as {user.role}</small>
            </p>
            <Button secondary outline small onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        )}
      </>
    );
  };

  const renderNavLinks = () => {
    return (
      <>
        <div className="nav-bar__nav">
          {user ? (
            <>
              <NavLink
                onClick={closeMobileMenu}
                to={"/bookings"}
                className={({ isActive }) =>
                  isActive ? "nav-bar__nav__link__active" : "nav-bar__nav__link"
                }
              >
                Bookings
              </NavLink>
            </>
          ) : (
            <NavLink
              onClick={closeMobileMenu}
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-bar__nav__link__active" : "nav-bar__nav__link"
              }
            >
              Flexi Work
            </NavLink>
          )}
        </div>
        <div className="nav-bar__nav">
          <NavLink
            onClick={closeMobileMenu}
            to={"/my-schedule"}
            className={({ isActive }) =>
              isActive ? "nav-bar__nav__link__active" : "nav-bar__nav__link"
            }
          >
            MySchedule
          </NavLink>
          <NavLink
            onClick={closeMobileMenu}
            to={"/time-sheet"}
            className={({ isActive }) =>
              isActive ? "nav-bar__nav__link__active" : "nav-bar__nav__link"
            }
          >
            Timesheet
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div className="nav-bar">
      {isMobile && (
        <div
          className={`nav-bar__${isMobile && isMenuOpen ? "close" : "toggle"}`}
          id="nav-bar-toggle"
          onClick={isMobile && isMenuOpen ? closeMobileMenu : toggleMenu}
        >
          {isMobile && isMenuOpen ? <IoClose /> : <IoMenu />}
        </div>
      )}
      <nav
        className={`nav-bar__container ${isMenuOpen && " nav-bar__show-menu"}`}
      >
        {" "}
        {renderNavLinks()}
        {renderUserStatus()}
      </nav>
    </div>
  );
};

export default Navigation;
