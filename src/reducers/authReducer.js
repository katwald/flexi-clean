import { createSlice } from "@reduxjs/toolkit";
import loginServices from "../services/signIn";

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: null,
  reducers: {
    userLogin: (state, action) => {
      return action.payload;
    },
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { userLogin, setUser } = authenticationSlice.actions;

export const signup = (credentials) => {
  return async (dispatch) => {
    const user = await loginServices.signup(credentials);
    console.log("user", user, "credentials", credentials);
    dispatch(userLogin(user));
  };
};
export const signIn = (credentials) => {
  return async (dispatch) => {
    const user = await loginServices.signIn(credentials);
    console.log("user", user, "credential", credentials);
    dispatch(userLogin(user));
  };
};

export default authenticationSlice.reducer;
