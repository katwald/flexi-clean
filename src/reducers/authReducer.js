import { createSlice } from "@reduxjs/toolkit";
import signInServices from "../services/signIn";
import bookingServices from "../services/bookings";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: null,
  reducers: {
    userSignIn: (state, action) => {
      return action.payload;
    },
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { userSignIn, setUser } = authenticationSlice.actions;

export const signup = (credentials) => {
  return async () => {
    await signInServices.signup(credentials);
  };
};
export const signIn = (credentials) => {
  return async (dispatch) => {
    const user = await signInServices.signIn(credentials);
    dispatch(userSignIn(user));
    window.localStorage.setItem("loggedFlexWorkAppUser", JSON.stringify(user));
    bookingServices.setToken(user.token);
  };
};

export const getUser = () => {
  return async (dispatch) => {
    const loggedFlexWorkAppUserJSON = window.localStorage.getItem(
      "loggedFlexWorkAppUser"
    );
    if (loggedFlexWorkAppUserJSON) {
      const user = await JSON.parse(loggedFlexWorkAppUserJSON);
      dispatch(setUser(user));
      bookingServices.setToken(user.token);
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    const loggedFlexWorkAppUserJSON = window.localStorage.getItem(
      "loggedFlexWorkAppUser"
    );
    if (loggedFlexWorkAppUserJSON) {
      window.localStorage.removeItem("loggedFlexWorkAppUser");
      dispatch(setUser(null));
    }
  };
};
export default authenticationSlice.reducer;
