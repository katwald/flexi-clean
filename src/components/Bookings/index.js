import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Modal";

import { assignWorker } from "../../reducers/bookingsReducers";

const Bookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings);
  const employees = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState(false);
  const [booking, setBooking] = useState(null);

  const handleClickAssign = (booking) => {
    setBooking(booking);
    setShowModal(true);
  };
  const dispatchAssignedWorker = (employee) => {
    const updatedBookingObj = {
      ...booking,
      cleaningStatus: {
        ...booking.cleaningStatus,
        assignedCleaner: `${employee.firstName} ${employee.lastName}`,
      },
    };
    dispatch(assignWorker(booking.id, updatedBookingObj));
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
              <h4>{b.venueName}</h4>
              <p> booking start: {bookingStart}</p>
              <p>booking End: {bookingEnd}</p>
              <p>{bookingDescription}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>{assignedCleaner}</p>
              {/* {assignedCleaner && (
                <button onChange={handleEditSchedule} style={{ height: 32 }}>
                  edit
                </button>
              )} */}
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
      {showModal && (
        <Modal setShowModal={setShowModal}>{renderEmployees()}</Modal>
      )}
    </div>
  );
};

export default Bookings;
