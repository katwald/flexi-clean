import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateBooking, removeBooking } from "../../reducers/bookingsReducers";

import Modal from "../Modal";
import EditBookingForm from "../Forms/BookingForm/EditBookingForm";
const Bookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings);
  const employees = useSelector((state) => state.employees);
  const [workerModal, setWorkerModal] = useState(false);
  const [editBookingModal, setEditBookingModal] = useState(false);
  const [booking, setBooking] = useState(null);
  //edit booking form values
  const [bookingStart, setBookingStart] = useState("");
  const [bookingEnd, setBookingEnd] = useState("");
  const [bookingDescription, setbookingDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [cleaningDate, setCleaningDate] = useState("");

  const handleClickAssign = (booking) => {
    setBooking(booking);
    setWorkerModal(!workerModal);
  };

  const handleEditBooking = (booking) => {
    const { bookingStart, bookingEnd, bookingDescription, cleaningDate } =
      booking.bookingStatus;
    setBooking(booking);
    setEditBookingModal(!editBookingModal);
    setBookingStart(bookingStart);
    setBookingEnd(bookingEnd);
    setbookingDescription(bookingDescription);
    setVenue(booking.venueName);
    setCleaningDate(cleaningDate);
  };
  const handleDeleteBooking = (bookingId) => {
    dispatch(removeBooking(bookingId));
  };
  const dispatchAssignedWorker = (employee) => {
    const updatedBookingObj = {
      ...booking,
      cleaningStatus: {
        ...booking.cleaningStatus,
        assignedCleaner: `${employee.firstName} ${employee.lastName}`,
      },
    };
    dispatch(updateBooking(booking.id, updatedBookingObj));
  };
  const handleRemoveAssignedEmployee = (booking) => {
    const updatedBookingObj = {
      ...booking,
      cleaningStatus: {
        ...booking.cleaningStatus,
        assignedCleaner: "",
      },
    };
    dispatch(updateBooking(booking.id, updatedBookingObj));
  };

  const renderBookings =
    bookings &&
    bookings.map((b) => {
      const { bookingStart, bookingEnd, bookingDescription } = b.bookingStatus;
      const { assignedCleaner } = b.cleaningStatus;

      return (
        <div key={Number(b.id)}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h4>{b.venueName} </h4>
              <p> booking start: {bookingStart}</p>
              <p>booking End: {bookingEnd}</p>
              <p>{bookingDescription}</p>
              <span>
                {" "}
                <button onClick={() => handleEditBooking(b)}>
                  edit booking
                </button>
                <button onClick={() => handleDeleteBooking(b.id)}>
                  delete booking
                </button>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {assignedCleaner && (
                <>
                  <p>{assignedCleaner}</p>
                  <button
                    onClick={() => handleRemoveAssignedEmployee(b)}
                    style={{ height: 32 }}
                  >
                    cancel
                  </button>
                </>
              )}
              {!assignedCleaner && (
                <button
                  onClick={() => handleClickAssign(b)}
                  style={{ height: 32 }}
                >
                  Assign worker
                </button>
              )}
            </div>
          </div>
          <hr />
        </div>
      );
    });

  const renderEmployees = () =>
    employees &&
    employees.map((employee) => (
      <li key={Number(employee.id)}>
        {`${employee.firstName}  ${employee.lastName}`}{" "}
        <span>
          <button onClick={() => dispatchAssignedWorker(employee)}>
            Assign
          </button>
        </span>
      </li>
    ));
  return (
    <div style={{ padding: 20, position: "relative", height: "100vh" }}>
      <hr />
      {renderBookings}
      {workerModal && (
        <Modal setShowModal={setWorkerModal}>{renderEmployees()}</Modal>
      )}
      {editBookingModal && (
        <Modal setShowModal={setEditBookingModal}>
          <EditBookingForm
            _booking={booking}
            _venue={venue}
            _startDate={bookingStart}
            _endDate={bookingEnd}
            _description={bookingDescription}
            _cleaningDate={cleaningDate}
          />
        </Modal>
      )}
    </div>
  );
};

export default Bookings;
