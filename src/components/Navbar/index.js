import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  setNotification,
  setNotificationType,
} from "../../reducers/notificationReducer";

import { signOut } from "../../reducers/authReducer";

import Button from "../Button";
import "./index.scss";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(setNotification(`${user.user.firstName} logged out.`));
    dispatch(setNotificationType("success"));
  };

  const supervisor = user && user.role === "Supervisor";
  return (
    <div className="nav-bar">
      <div className="nav-bar__container">
        <div className="nav-bar__nav">
          {user ? (
            <NavLink
              to={"/bookings"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Bookings
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Flexi Work
            </NavLink>
          )}
        </div>
        {user &&
          (supervisor ? (
            <div className="nav-bar__nav">
              <NavLink
                to={"/employees"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Employees
              </NavLink>
            </div>
          ) : (
            <div className="nav-bar__nav">
              <NavLink
                to={"/my-schedule"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                MySchedule
              </NavLink>
            </div>
          ))}
      </div>

      {user && (
        <div className="nav-bar__user-status">
          <p>
            {user.firstName} <small> as {user.role}</small>
          </p>

          <Button secondary outline onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
