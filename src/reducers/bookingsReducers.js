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
    updateBooking(state, action) {
      const updatedBooking = state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      return updatedBooking;
    },
  },
});

export const { setBookings, appendBooking, updateBooking } =
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
export const assignWorker = (bookingId, updatedObj) => {
  return async (dispatch) => {
    const response = await bookingServices.update(bookingId, updatedObj);
    dispatch(updateBooking(response));
  };
};

export default bookingSlice.reducer;
