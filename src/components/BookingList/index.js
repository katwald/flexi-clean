import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const Bookings = () => {
  const bookings = useSelector((state) => state.bookings);

  const navigate = useNavigate();
  const handleRowClick = (id) => navigate(`/bookings/${id}`);
  const renderBookings =
    bookings &&
    bookings.map((b) => {
      const { bookingStart, bookingEnd } = b.bookingStatus;
      const { assignedCleaner } = b.cleaningStatus;
      return (
        <tr
          key={Number(b.id)}
          onClick={() => handleRowClick(b.id)}
          className="booking-table-row"
        >
          {/* <Link to={`/bookings/${b.id}`}> */}
          <td data-label="VENUE NAME">{b.venueName}</td>
          <td data-label="CHECKIN">{bookingStart}</td>
          <td data-label="CHECKOUT">{bookingEnd}</td>
          <td data-label="ASSIGNED WORKER">
            {" "}
            <div className="employee-info">
              {assignedCleaner ? <p>{assignedCleaner}</p> : <p>?</p>}
            </div>
          </td>
          {/* </Link> */}
        </tr>
      );
    });

  return (
    <div style={{ padding: 20, position: "relative", height: "100vh" }}>
      <table>
        <caption>Booking Lists</caption>
        <thead>
          <tr>
            <th scope="col">Venue Name</th>
            <th scope="col">Checkin</th>
            <th scope="col">Checkout</th>
            <th scope="col">Assigned Worker</th>
          </tr>
        </thead>
        <tbody>{renderBookings}</tbody>
      </table>
    </div>
  );
};

export default Bookings;
