import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { initializeBookings } from "./reducers/bookingsReducers";

import Navigation from "./components/Navigation";
import MySchedule from "./components/MySchedule";
import Info from "./components/Info";
import Bookings from "./components/Bookings";
import BookingForm from "./components/BookingForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBookings());
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/my-schedule" element={<MySchedule />} />
        <Route path="/info" element={<Info />} />
        <Route path="/create-bookings" element={<BookingForm />} />
        <Route path="/" element={<Bookings />} />
      </Routes>
    </div>
  );
};

export default App;
