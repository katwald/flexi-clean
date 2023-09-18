import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const Navigation = () => {
  const navList = [
    { label: "/", value: "Home" },
    { label: "/worker", value: "worker" },
    // { label: "/create-booking", value: "CreateBooking" },
    // { label: "/old-bookings", value: "Old Bookings" }, TODO
  ];
  return (
    <div className="nav-bar">
      <div className="nav-bar__container">
        {navList.map((nav) => (
          <div key={nav.label} className="nav-bar__nav">
            <Link to={`${nav.label}`}>{nav.value}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
