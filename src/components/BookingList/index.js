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
      const { bookingStart, bookingEnd, cleaningDate } = b.bookingStatus;
      const { assignedCleaner } = b.cleaningStatus;
      return (
        <tr
          key={Number(b.id)}
          onClick={() => handleRowClick(b.id)}
          className="booking-table-row"
        >
          <td data-label="Venue Name">{b.venueName}</td>
          <td data-label="Check-In">{bookingStart}</td>
          <td data-label="Checkout">{bookingEnd}</td>
          <td data-label="Cleaning-Date">{cleaningDate}</td>
          <td data-label="Assigned Worker">
            {" "}
            <div className="employee-info">
              {assignedCleaner ? <p>{assignedCleaner}</p> : <p>?</p>}
            </div>
          </td>
        </tr>
      );
    });

  return (
    <div>
      <table>
        <caption>Booking Lists</caption>
        <thead>
          <tr>
            <th scope="col">Venue Name</th>
            <th scope="col">Checkin</th>
            <th scope="col">Checkout</th>
            <th scope="col">Cleaning Date</th>
            <th scope="col">Assigned Worker</th>
          </tr>
        </thead>
        <tbody>{renderBookings}</tbody>
      </table>
    </div>
  );
};

export default Bookings;
