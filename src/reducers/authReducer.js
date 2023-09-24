import { createSlice } from "@reduxjs/toolkit";
import signInServices from "../services/signIn";

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
    }
  };
};

export default authenticationSlice.reducer;
