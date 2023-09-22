import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import { initializeBookings } from "./reducers/bookingsReducers";
import { initializeEmployees } from "./reducers/employeesReducer";
import Navigation from "./components/Navbar";
import MySchedule from "./components/MySchedule";
import EmployeesList from "./components/EmployeesList";
import Bookings from "./components/BookingList";
import BookingForm from "./components/Forms/BookingForm/NewbookingForm";
import OldBookings from "./components/OldBookings/OldBookings";
import SingleBooking from "./components/SingleBooking";
import SignInForm from "./components/Forms/SignInForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBookings());
    dispatch(initializeEmployees());
  }, []);

  const bookings = useSelector((state) => state.bookings);

  const matchBooking = useMatch("/bookings/:id");
  console.log(
    "matchBooking",
    matchBooking && matchBooking.params.id === bookings[0].id
  );

  const singleBooking =
    matchBooking && matchBooking
      ? bookings.find((booking) => booking.id === matchBooking.params.id)
      : null;
  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route path="/my-schedule" element={<MySchedule />} />
        <Route path="/worker" element={<EmployeesList />} />
        <Route path="/create-booking" element={<BookingForm />} />
        <Route path="/old-bookings" element={<OldBookings />} />
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
