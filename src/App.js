/* eslint-disable indent */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import { initializeBookings } from "./reducers/bookingsReducers";
import { initializeEmployees } from "./reducers/employeesReducer";
import { getUser } from "./reducers/authReducer";

import Navigation from "./components/Navbar";
import MySchedule from "./components/MySchedule";
import EmployeesList from "./components/EmployeesList";
import Bookings from "./components/BookingList";
import BookingForm from "./components/Forms/BookingForm/NewbookingForm";
import SingleBooking from "./components/SingleBooking";
import SignInForm from "./components/Forms/SignInForm";
import SignUpForm from "./components/Forms/SignUpForm";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings);
  const notification = useSelector((state) => state.notification);
  const { message, messageType } = notification;

  useEffect(() => {
    dispatch(initializeBookings());
    dispatch(initializeEmployees());
    dispatch(getUser());
  }, [message]);

  const matchBooking = useMatch("/bookings/:id");

  const singleBooking = matchBooking
    ? bookings.find((booking) => booking.id === matchBooking.params.id)
    : null;

  return (
    <div className="container">
      <Navigation />
      {message && messageType && (
        <Notification message={message} messageType={messageType} />
      )}
      <Routes>
        <Route path="/my-schedule" element={<MySchedule />} />
        <Route path="/employees" element={<EmployeesList />} />
        <Route path="/create-booking" element={<BookingForm />} />
        <Route
          path="/bookings/:id"
          element={<SingleBooking singleBooking={singleBooking} />}
        />
        <Route path="/bookings" element={<Bookings />} />

        <Route path="/" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>
    </div>
  );
};

export default App;
