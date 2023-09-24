import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./index.scss";

const Navigation = () => {
  const user = useSelector((state) => state.user);
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
    </div>
  );
};

export default Navigation;
