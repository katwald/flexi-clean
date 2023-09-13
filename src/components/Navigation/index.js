import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

const Navigation = () => {
  const navList = [
    { label: "/", value: "Home" },
    { label: "/create-booking", value: "CreateBooking" },
    { label: "/old-bookings", value: "Old Bookings" },
    { label: "/worker", value: "worker" },
  ];
  return (
    <div className="nav-bar">
      {navList.map((nav) => (
        <div key={nav.label} className="nav">
          <Link to={`${nav.label}`}>{nav.value}</Link>
        </div>
      ))}
    </div>
  );
};

export default Navigation;
