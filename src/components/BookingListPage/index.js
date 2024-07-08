import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { filterUniqueVenue } from "../../helpers/filterUniqueVenue";

import Button from "../Button";
import NewbookingForm from "../Forms/BookingForm/NewbookingForm";
import Modal from "../Modal";
import Card from "../Common/Card";

import { initializeBookings } from "../../reducers/bookingsReducers";

import "./index.scss";

const Bookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);

  const Navigate = useNavigate();
  const handleRowClick = (id) => Navigate(`/bookings/${id}`);

  const uniqueVenue = filterUniqueVenue(bookings);
  useEffect(() => {
    dispatch(initializeBookings());
  }, [user && user.token]);

  if (!user) {
    return Navigate("/");
  }
  const renderBooking = (booking) => {
    if (booking) {
      const { bookingStart, bookingEnd, bookingDescription, cleaningTag } =
        booking.bookingStatus;
      const { assignedCleaner } = booking.cleaningStatus || null;

      return (
        <Card
          key={booking.id}
          startTime={bookingStart}
          endTime={bookingEnd}
          description={bookingDescription || "Missing Details"}
          userName={assignedCleaner || "?"}
          title={booking.venueName}
          tag={cleaningTag || "Normal"}
          onClick={() => handleRowClick(booking.id)}
          hasAvatar
        />
      );
    }
  };
  return (
    <div className="booking-list">
      <div className="booking-list__header">
        <h1 className="booking-list__title">Booking List </h1>
        <div>
          {user && user.role === "supervisor" && (
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
        <>
          <h4>{uv}</h4>
          {bookings.map(
            (booking) => booking.venueName === uv && renderBooking(booking)
          )}
        </>
      ))}
    </div>
  );
};

export default Bookings;
