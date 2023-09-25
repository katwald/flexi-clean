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
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const { message, messageType } = notification;
  console.log("user in app", user);

  useEffect(() => {
    dispatch(initializeBookings());
    dispatch(initializeEmployees());
    dispatch(getUser());
  }, [message]);

  const matchBooking = useMatch("/bookings/:id");
  console.log(
    "matchBooking",
    matchBooking,
    matchBooking && matchBooking.params.id === bookings[0].id
  );

  const singleBooking = matchBooking
    ? bookings.find(
        (booking) => Number(booking.id) === Number(matchBooking.params.id)
      )
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
      </Routes>
    </div>
  );
};

export default App;
