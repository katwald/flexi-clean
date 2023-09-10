import { configureStore } from "@reduxjs/toolkit";
import bookingreducers from "./reducers/bookingsReducers";
import employeesReducers from "./reducers/employeesReducer";

const store = configureStore({
  reducer: {
    bookings: bookingreducers,
    employees: employeesReducers,
  },
});
export default store;
