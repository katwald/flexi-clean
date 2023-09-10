import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const style = {
    padding: 10,
    fontWeight: 700,
  };

  return (
    <div>
      <Link to="/" style={style}>
        Home
      </Link>
      <Link to="/create-bookings" style={style}>
        create bookings
      </Link>
      <Link to="/worker" style={style}>
        worker
      </Link>
      {/* these link will be modified for user view.
       <Link to="/" style={style}>
        Home
      </Link>
      <Link to="/my-schedules" style={style}>
        My schedules
      </Link>
      <Link to="/my-schedules" style={style}>
        My schedules
      </Link> */}
    </div>
  );
};

export default Navigation;
