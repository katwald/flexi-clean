import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  setNotification,
  setNotificationType,
} from "../../reducers/notificationReducer";

import Button from "../Button";
import "./index.scss";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleSignOut = () => {
    window.localStorage.removeItem("loggedFlexWorkAppUser");
    dispatch(setNotification(`${user.user.firstName} logged out.`));
    dispatch(setNotificationType("success"));
  };
  return (
    <div className="nav-bar">
      <div className="nav-bar__container">
        <div className="nav-bar__nav">
          {user ? (
            <Link to={"/bookings"}>Bookings</Link>
          ) : (
            <Link to="/">Flexi Work</Link>
          )}
        </div>
        {user && user.user.role === "Supervisor" && (
          <div className="nav-bar__nav">
            <Link to={"/employees"}>Employees</Link>
          </div>
        )}
      </div>
      {user && (
        <div className="nav-bar__user-status">
          <p>{user.user.firstName}</p>

          <Button secondary outline onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
