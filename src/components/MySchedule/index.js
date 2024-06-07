import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { readableDate } from "../../helpers/readableDate";

import "./style.scss";

const MySchedule = () => {
  const bookings = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.user);

  const Navigate = useNavigate();
  const handleRowClick = (id) => Navigate(`/bookings/${id}`);
  const renderBookings =
    bookings &&
    bookings
      .filter((booking) => {
        const { assignedCleaner } = booking.cleaningStatus || null;
        if (user && `${user.firstName} ${user.lastName}` === assignedCleaner) {
          return booking;
        }
      })
      .map((booking) => {
        const { assignedCleaner } = booking.cleaningStatus || null;
        const { bookingStart, bookingEnd, cleaningDate } =
          booking.bookingStatus;
        return (
          <tr
            key={Number(booking.id)}
            onClick={() => handleRowClick(booking.id)}
            className="booking-table-row"
          >
            <td data-label="Venue Name">{booking.venueName}</td>
            <td data-label="Check-In">{readableDate(bookingStart)}</td>
            <td data-label="Checkout">{readableDate(bookingEnd)}</td>
            <td data-label="Cleaning-Date">{readableDate(cleaningDate)}</td>
            <td data-label="Assigned Worker">
              {" "}
              <div className="employee-info">
                {assignedCleaner ? <p>{assignedCleaner}</p> : <p>?</p>}
              </div>
            </td>
          </tr>
        );
      });

  if (!user) {
    return Navigate("/");
  }
  return (
    <div className="booking-list">
      <div className="booking-list__header">
        <h1 className="booking-list__title">My tasks </h1>
      </div>
      {renderBookings.length > 0 ? (
        <table>
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
      ) : (
        <p className="booking-list__no-bookings"> No tasks assigned yet !</p>
      )}
    </div>
  );
};

export default MySchedule;
