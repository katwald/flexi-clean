/* eslint-disable indent */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";

import { removeBooking } from "../../reducers/bookingsReducers";
import { updateBooking } from "../../reducers/bookingsReducers";
import {
  setNotification,
  setNotificationType,
} from "../../reducers/notificationReducer";
import { readableDate } from "../../helpers/readableDate";

import EditBookingForm from "../Forms/BookingForm/EditBookingForm";
import CommentForm from "../Forms/CommentForm";
import Modal from "../Modal";
import Button from "../Button";

import "./index.scss";

const SingleBooking = ({ singleBooking }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const user = useSelector((state) => state.user);

  const [editBookingModal, setEditBookingModal] = useState(false);
  const [booking, setBooking] = useState(null);
  const [workerModal, setWorkerModal] = useState(false);

  const supervisor = user && user.user.role === "Supervisor";

  const handleEditBooking = () => {
    setEditBookingModal(!editBookingModal);
  };
  const handleDeleteBooking = (bookingId, venueName) => {
    if (
      window.confirm(
        `Are you sure you want delete  ${venueName} boooking Info ? `
      )
    ) {
      dispatch(removeBooking(bookingId));
      dispatch(
        setNotification(`${venueName} info has been successfully deleted. `)
      );
      dispatch(setNotificationType("success"));
      Navigate("/");
    }
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
  const renderEmployees = () => {
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {supervisor ? (
            employees &&
            employees.map((employee) => (
              <tr key={Number(employee.id)}>
                <td data-label="Name">
                  {`${employee.firstName}  ${employee.lastName}`}
                </td>
                <td>
                  <span className="employee-list__body__button">
                    <Button
                      primary
                      outline
                      small
                      onClick={() => {
                        dispatchAssignedWorker(employee);
                        dispatch(
                          setNotification(
                            `${employee.firstName} ${employee.lastName}  has been successfully  Assigned. `
                          )
                        );
                        dispatch(setNotificationType("success"));
                      }}
                    >
                      Assign
                    </Button>
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td data-label="Name">
                {`${user.user.firstName}  ${user.user.lastName}`}
              </td>
              <td>
                <span className="employee-list__body__button">
                  <Button
                    primary
                    outline
                    small
                    onClick={() => {
                      dispatchAssignedWorker(user.user);
                      dispatch(
                        setNotification(
                          `${user.user.firstName} ${user.user.lastName}  has been successfully  Assigned. `
                        )
                      );
                      dispatch(setNotificationType("success"));
                    }}
                  >
                    Assign
                  </Button>
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  const renderWorkerAssignment = () => {
    return (
      <>
        {assignedCleaner ? (
          <span className="booking__assigned-to">{assignedCleaner}</span>
        ) : (
          <Button
            primary
            onClick={() => handleClickAssign(singleBooking)}
            style={{ height: 32 }}
          >
            Assign worker
          </Button>
        )}
        {assignedCleaner &&
        (assignedCleaner === `${user.user.firstName} ${user.user.lastName}` ||
          supervisor) ? (
          <>
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
        ) : null}
      </>
    );
  };
  if (!user) {
    return Navigate("/");
  }
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
            <h3 className="booking__content__checkin--date-title">Checkin</h3>
            <p className="booking__content__checkin-date">
              {readableDate(bookingStart)}
            </p>
            <h3 className="booking__content__checkout-date-title">Checkout</h3>
            <p className="booking__content__checkout-date">
              {readableDate(bookingEnd)}
            </p>
            <h3 className="booking__content__cleaning-date-title">
              Cleaning Date
            </h3>
            <p className="booking__content__cleaning-date">
              {readableDate(cleaningDate)}
            </p>
            <h3 className="booking__content__description-title">Description</h3>
            <p className="booking__content__description">
              {bookingDescription}
            </p>
          </div>
          {supervisor && (
            <div className="booking__content__modify">
              <Button small outline primary onClick={() => handleEditBooking()}>
                Edit
              </Button>
              <Button
                small
                outline
                danger
                onClick={() =>
                  handleDeleteBooking(singleBooking.id, singleBooking.venueName)
                }
              >
                Delete
              </Button>
            </div>
          )}
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
          <Modal setShowModal={setWorkerModal} title={"Assign Task"}>
            {renderEmployees()}
          </Modal>
        )}
      </div>
    </>
  );
};

export default SingleBooking;
