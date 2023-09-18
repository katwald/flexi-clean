import { configureStore } from "@reduxjs/toolkit";
import bookingReducers from "./reducers/bookingsReducers";
import employeesReducers from "./reducers/employeesReducer";
import notificationReducers from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    bookings: bookingReducers,
    employees: employeesReducers,
    notification: notificationReducers,
  },
});
export default store;
