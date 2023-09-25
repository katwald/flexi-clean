import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { readableDate } from "../../helpers/readableDate";

import Button from "../Button";
import NewbookingForm from "../Forms/BookingForm/NewbookingForm";
import Modal from "../Modal";
import Notification from "../Notification";

import "./index.scss";

const Bookings = () => {
  const bookings = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const [modalOpen, setModalOpen] = useState(false);

  const { message, messageType } = notification;

  const Navigate = useNavigate();
  const handleRowClick = (id) => Navigate(`/bookings/${id}`);

  const renderBookings =
    bookings &&
    bookings.map((b) => {
      const { bookingStart, bookingEnd, cleaningDate } = b.bookingStatus;
      const { assignedCleaner } = b.cleaningStatus || null;

      return (
        <tr
          key={Number(b.id)}
          onClick={() => handleRowClick(b.id)}
          className="booking-table-row"
        >
          <td data-label="Venue Name">{b.venueName}</td>
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
      {message && messageType && (
        <Notification messageType={messageType} message={message} />
      )}
      <div className="booking-list__header">
        <h1 className="employee-list__title">Booking List </h1>
        <div>
          {user && user.user.role === "Supervisor" && (
            <Button primary large onClick={() => setModalOpen(!modalOpen)}>
              New Booking
            </Button>
          )}
        </div>
        {modalOpen && (
          <Modal setShowModal={setModalOpen} title={"Add NewBooking"}>
            <NewbookingForm />
          </Modal>
        )}
      </div>
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
    </div>
  );
};

export default Bookings;
