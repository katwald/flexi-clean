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
    additionalInfo: {
      lostAndFound: "",
      needFixing: "",
      inventoryList: [], // inventoryList: [{ item1: 5 }, { item2: 7 }],
    },
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

export const createBooking = (bookingObject) => {
  const { venueName, bookingStatus } = bookingObject;
  const obj = {
    venueName: venueName,
    bookingStatus: {
      bookingStart: bookingStatus.bookingStart,
      bookingEnd: bookingStatus.bookingEnd,
      bookingDescription: bookingStatus.bookingDescription,
      cleaningDate: bookingStatus.cleanedDate,
    },
    cleaningStatus: {
      cleanedDate: "",
      assignedCleaner: "",
      cleaningStatus: "",
      cleaningHour: 0,
    },
    additionalInfo: {
      lostAndFound: "",
      needFixing: "",
      inventoryList: [], // inventoryList: [{ item1: 5 }, { item2: 7 }],
    },
  };
  return async (dispatch) => {
    const response = await bookingServices.createNew(obj);
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
