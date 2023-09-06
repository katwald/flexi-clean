import { createSlice } from "@reduxjs/toolkit";
import bookingServices from "../services/bookings";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: [],
  reducers: {
    setBookings(state, action) {
      return action.payload;
    },
  },
});

export const { setBookings } = bookingSlice.actions;

export const initializeBookings = () => {
  return async (dispatch) => {
    const bookings = await bookingServices.getAll();
    dispatch(setBookings(bookings));
  };
};

export default bookingSlice.reducer;
