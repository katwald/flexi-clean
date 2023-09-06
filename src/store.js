import { configureStore } from "@reduxjs/toolkit";
import bookingreducers from "./reducers/bookingsReducers";

const store = configureStore({
  reducer: {
    bookings: bookingreducers,
  },
});
export default store;
