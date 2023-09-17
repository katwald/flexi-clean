import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BiUser } from "react-icons/bi";

import { removeBooking } from "../../reducers/bookingsReducers";
import { updateBooking } from "../../reducers/bookingsReducers";

import EditBookingForm from "../Forms/BookingForm/EditBookingForm";
import CommentForm from "../Forms/CommentForm";
import Modal from "../Modal";
import Button from "../Button";
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
  const { comments } = singleBooking;

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
  const renderWorkerAssignment = () => {
    return (
      <>
        {assignedCleaner ? (
          <>
            <span className="booking__assigned-to">{assignedCleaner}</span>
            <span className="booking__assign-button">
              <Button
                small
                outline
                warning
                onClick={() => handleRemoveAssignedEmployee(singleBooking)}
              >
                Cancel
              </Button>
            </span>
          </>
        ) : (
          <button
            onClick={() => handleClickAssign(singleBooking)}
            style={{ height: 32 }}
          >
            Assign worker
          </button>
        )}
      </>
    );
  };
  return (
    <>
      <div className="booking">
        <div className="booking__header">
          <h1 className="booking__header__title">{singleBooking.venueName}</h1>
          <p>{singleBooking.bookingStatus.cleaningTag}</p>
          <div className="booking__header__assignment">
            {renderWorkerAssignment()}
          </div>
        </div>
        <div className="booking__content">
          <div>
            <h3 className="booking__content__cleaning-date-title">
              {" "}
              Cleaning Date
            </h3>
            <p className="booking__content__cleaning-date">{cleaningDate}</p>
            <h3 className="booking__content__checkin--date-title">Checkin</h3>
            <p className="booking__content__checkin-date">{bookingStart}</p>
            <h3 className="booking__content__checkout-date-title">Checkout</h3>
            <p className="booking__content__checkout-date">{bookingEnd}</p>
            <h3 className="booking__content__description-title">Description</h3>
            <p className="booking__content__description">
              {bookingDescription}
            </p>
          </div>
          <div className="booking__content__modify">
            <Button small outline primary onClick={() => handleEditBooking()}>
              Edit
            </Button>
            <Button
              small
              outline
              danger
              onClick={() => handleDeleteBooking(singleBooking.id)}
            >
              Delete
            </Button>
          </div>
        </div>
        <div className="booking__comments">
          <div>
            <h3>comments</h3>
            <ul>
              {singleBooking &&
                comments.map((comment) => (
                  <li className={"booking__comments__item"} key={comment}>
                    <div className="booking__comments__item__commented-by">
                      <div className="booking__comments__item__commented-by--icons">
                        <BiUser size={42} />
                      </div>
                      <div>
                        <p>Diwas</p>
                        <p className="booking__comments__item__commented-date">
                          12-Sep-2023
                        </p>
                      </div>
                    </div>

                    <p className="booking__comments__item__text"> {comment}</p>
                  </li>
                ))}
            </ul>
          </div>
          <div className="booking__comment-form">
            <CommentForm singleBooking={singleBooking} />
          </div>
        </div>

        {editBookingModal && (
          <div className="edit-form">
            <Modal title="Edit Booking" setShowModal={setEditBookingModal}>
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
    </>
  );
};

export default SingleBooking;
