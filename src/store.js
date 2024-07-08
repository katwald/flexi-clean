import { configureStore } from "@reduxjs/toolkit";

import authReducers from "./reducers/authReducer";
import bookingReducers from "./reducers/bookingsReducers";
import employeesReducers from "./reducers/employeesReducer";
import notificationReducers from "./reducers/notificationReducer";
import timesheetReducer from "./reducers/timesheetReducer";

const store = configureStore({
  reducer: {
    bookings: bookingReducers,
    employees: employeesReducers,
    notification: notificationReducers,
    user: authReducers,
    timeSheet: timesheetReducer,
  },
});
export default store;
