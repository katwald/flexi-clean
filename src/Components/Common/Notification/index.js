import React from "react";

import "./index.scss";
const Notification = ({ message, messageType }) => {
  return (
    <div className="notification">
      <p className={`notification__${messageType}`}>{message}</p>
    </div>
  );
};

export default Notification;
