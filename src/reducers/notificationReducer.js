import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
    messageType: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMessageType: (state, action) => {
      state.messageType = action.payload;
    },
  },
});

export const { setMessage, setMessageType } = notificationSlice.actions;

export const setNotification = (message) => {
  return async (dispatch) => {
    await dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(setMessage(null));
    }, 4000);
  };
};

export const setNotificationType = (notificationType) => {
  return async (dispatch) => {
    await dispatch(setMessageType(notificationType));
    setTimeout(() => {
      dispatch(setMessageType(null));
    }, 5000);
  };
};

export default notificationSlice.reducer;
