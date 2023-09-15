import { createSlice } from "@reduxjs/toolkit";
import bookingServices from "../services/bookings";

const initialState = [
  {
    venueName: "",
    bookingStatus: {
      bookingStart: "",
      bookingEnd: "",
      bookingDescription: "",
      cleaningDate: "",
    },
    cleaningStatus: {
      cleanedDate: "",
      assignedCleaner: "",
      cleaningStatus: "",
      cleaningHour: 0,
    },
    comments: [],
  },
];

const bookingSlice = createSlice({
  name: "bookings",
  initialState: initialState,
  reducers: {
    setBookings(state, action) {
      return action.payload;
    },
    appendBooking(state, action) {
      state.push(action.payload);
    },
    modifyBooking(state, action) {
      const updatedBooking = state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      return updatedBooking;
    },
    deleteBooking(state, action) {
      const removedbookings = state.filter(
        (booking) => booking.id !== action.payload
      );
      return removedbookings;
    },
  },
});

export const { setBookings, appendBooking, modifyBooking, deleteBooking } =
  bookingSlice.actions;

export const initializeBookings = () => {
  return async (dispatch) => {
    const bookings = await bookingServices.getAll();
    dispatch(setBookings(bookings));
  };
};

export const createBooking = (bookinObject) => {
  console.log("initial object..", initialState, "booking obj", bookinObject);
  const { bookingDescription, bookingStart, bookingEnd, cleaningDate } =
    bookinObject.bookingStatus;
  const newObj = {
    ...initialState[0],
    venueName: bookinObject.venueName,
    bookingStatus: {
      ...initialState.bookingStatus,
      bookingDescription: bookingDescription,
      bookingStart: bookingStart,
      bookingEnd: bookingEnd,
      cleaningDate: cleaningDate,
    },
  };
  console.log("and this is new: ", newObj);
  return async (dispatch) => {
    const response = await bookingServices.createNew(newObj);
    dispatch(appendBooking(response));
  };
};
export const updateBooking = (bookingId, updatedObj) => {
  return async (dispatch) => {
    const response = await bookingServices.update(bookingId, updatedObj);
    dispatch(modifyBooking(response));
  };
};
export const removeBooking = (bookingId) => {
  return async (dispatch) => {
    await bookingServices.remove(bookingId);
    dispatch(deleteBooking(bookingId));
  };
};

export default bookingSlice.reducer;
