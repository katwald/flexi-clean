import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { initializeBookings } from "./reducers/bookingsReducers";
import { initializeEmployees } from "./reducers/employeesReducer";

import Navigation from "./components/Navigation";
import MySchedule from "./components/MySchedule";
import EmployeesList from "./components/EmployeesList";
import Bookings from "./components/Bookings";
import BookingForm from "./components/Forms/BookingForm/NewbookingForm";
import OldBookings from "./components/OldBookings/OldBookings";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBookings());
    dispatch(initializeEmployees());
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/my-schedule" element={<MySchedule />} />
        <Route path="/worker" element={<EmployeesList />} />
        <Route path="/create-bookings" element={<BookingForm />} />
        <Route path="/old-bookings" element={<OldBookings />} />
        <Route path="/" element={<Bookings />} />
      </Routes>
    </div>
  );
};

export default App;
