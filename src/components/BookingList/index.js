import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { readableDate } from "../../helpers/readableDate";
import { filterUniqueVenue } from "../../helpers/filterUniqueVenue";

import Button from "../Button";
import NewbookingForm from "../Forms/BookingForm/NewbookingForm";
import Modal from "../Modal";

import "./index.scss";

const Bookings = () => {
  const bookings = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  const Navigate = useNavigate();
  const handleRowClick = (id) => Navigate(`/bookings/${id}`);

  console.log("unique Venue", filterUniqueVenue(bookings));
  const uniqueVenue = filterUniqueVenue(bookings);

  const renderBooking = (booking) => {
    if (booking) {
      const { bookingStart, bookingEnd, cleaningDate } = booking.bookingStatus;
      const { assignedCleaner } = booking.cleaningStatus || null;

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
    }
  };

  if (!user) {
    return Navigate("/");
  }
  return (
    <div className="booking-list">
      <div className="booking-list__header">
        <h1 className="employee-list__title">Booking List </h1>
        <div>
          {user && user.user.role === "Supervisor" && (
            <Button
              primary
              large
              onClick={() => setModalVisible(!modalVisible)}
            >
              New Booking
            </Button>
          )}
        </div>
        {modalVisible && (
          <Modal setShowModal={setModalVisible} title={"Add NewBooking"}>
            <NewbookingForm
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            />
          </Modal>
        )}
      </div>
      {uniqueVenue.map((uv) => (
        <table key={uv}>
          <caption>{uv}</caption>
          <thead>
            <tr>
              <th scope="col">Venue Name</th>
              <th scope="col">Checkin</th>
              <th scope="col">Checkout</th>
              <th scope="col">Cleaning Date</th>
              <th scope="col">Assigned Worker</th>
            </tr>
          </thead>
          {bookings.map(
            (booking) =>
              booking.venueName === uv && (
                <tbody key={booking.id}>{renderBooking(booking)}</tbody>
              )
          )}
        </table>
      ))}
    </div>
  );
};

export default Bookings;
