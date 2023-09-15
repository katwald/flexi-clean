import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBooking } from "../../reducers/bookingsReducers";
import { updateBooking } from "../../reducers/bookingsReducers";

import EditBookingForm from "../Forms/BookingForm/EditBookingForm";
import Modal from "../Modal";

import "./index.scss";

const SingleBooking = ({ singleBooking }) => {
  const dispatch = useDispatch();
  const [editBookingModal, setEditBookingModal] = useState(false);
  const [booking, setBooking] = useState(null);
  const employees = useSelector((state) => state.employees);
  const [workerModal, setWorkerModal] = useState(false);

  const handleEditBooking = () => {
    setEditBookingModal(!editBookingModal);
  };
  const handleDeleteBooking = (bookingId) => {
    dispatch(removeBooking(bookingId));
  };
  const {
    bookingStart,
    bookingEnd,
    bookingDescription,
    cleaningDate,
    cleaningTag,
  } = singleBooking.bookingStatus;
  const { assignedCleaner } = singleBooking.cleaningStatus;

  const handleClickAssign = (booking) => {
    setBooking(booking);
    setWorkerModal(!workerModal);
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
    <>
      <div className="single-booking">
        <div>
          <h2>{singleBooking.venueName}</h2>
          <p>
            {" "}
            <strong>Checkin : </strong>
            {bookingStart}
          </p>
          <p>
            <strong>Checkout: </strong>
            {bookingEnd}
          </p>
          <p>
            <strong>Booking Details: </strong>
            {bookingDescription}
          </p>
          <span>
            {" "}
            <button onClick={() => handleEditBooking()}>edit booking</button>
            <button onClick={() => handleDeleteBooking(singleBooking.id)}>
              delete booking
            </button>
          </span>
          <div>
            <div>
              {assignedCleaner && (
                <>
                  <p>
                    {" "}
                    <strong>Assigned worker:</strong> {assignedCleaner}
                  </p>
                  <button
                    onClick={() => handleRemoveAssignedEmployee(singleBooking)}
                    style={{ height: 32 }}
                  >
                    cancel
                  </button>
                </>
              )}
              {!assignedCleaner && (
                <button
                  onClick={() => handleClickAssign(singleBooking)}
                  style={{ height: 32 }}
                >
                  Assign worker
                </button>
              )}
            </div>
            <h3>Comments</h3>
          </div>

          {editBookingModal && (
            <div className="edit-form">
              <Modal setShowModal={setEditBookingModal}>
                <EditBookingForm
                  _booking={singleBooking}
                  _venue={singleBooking.venueName}
                  _startDate={bookingStart}
                  _endDate={bookingEnd}
                  _description={bookingDescription}
                  _cleaningDate={cleaningDate}
                  _cleaningTag={cleaningTag}
                />
              </Modal>
            </div>
          )}
          {workerModal && (
            <Modal setShowModal={setWorkerModal}>{renderEmployees()}</Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleBooking;
