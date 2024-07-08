import { createSlice } from "@reduxjs/toolkit";
import timeSheetServices from "../services/timeSheet";

const initialState = [
  {
    venueName: "",
    startTime: "",
    endTime: "",
    date: "",
    description: "",
  },
];

const timeSheetSlice = createSlice({
  name: "timeSheet",
  initialState: initialState,
  reducers: {
    setTimeSheet: (state, action) => {
      return action.payload;
    },
    appendTimeSheet: (state, action) => {
      state.push(action.payload);
    },
    modifyTimeSheet(state, action) {
      const updatedTimeSheet = state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
      return updatedTimeSheet;
    },
    deleteTimeSheet: (state, action) => {
      const removedTimeSheets = state.filter(
        (TimeSheet) => TimeSheet.id !== action.payload
      );
      return removedTimeSheets;
    },
  },
});

export const {
  setTimeSheet,
  appendTimeSheet,
  modifyTimeSheet,
  deleteTimeSheet,
} = timeSheetSlice.actions;

const getTokenFromLocalStorage = () => {
  const loggedFlexWorkAppUserJSON = window.localStorage.getItem(
    "loggedFlexWorkAppUser"
  );
  if (loggedFlexWorkAppUserJSON) {
    const user = JSON.parse(loggedFlexWorkAppUserJSON);
    return user.token;
  }
};

export const initializeTimeSheets = () => {
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    timeSheetServices.setToken(token);
    const timeSheet = await timeSheetServices.getAll();
    dispatch(setTimeSheet(timeSheet));
  };
};

export const createTimeSheet = (timeSHeetObj) => {
  const { venueName, startTime, endTime, date, description } = timeSHeetObj;
  const newObj = {
    venueName,
    startTime,
    endTime,
    date,
    description,
  };
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    timeSheetServices.setToken(token);

    const response = await timeSheetServices.createNew(newObj);
    console.log("newtime reducer", newObj);
    dispatch(appendTimeSheet(response));
  };
};
export const updateTimeSheet = (TimeSheetId, updatedObj) => {
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    timeSheetServices.setToken(token);
    console.log("TimeSheetId...", updatedObj);
    const response = await timeSheetServices.update(TimeSheetId, updatedObj);
    console.log("response....", response);
    dispatch(modifyTimeSheet(response));
  };
};
export const removeTimeSheet = (TimeSheetId) => {
  return async (dispatch) => {
    const token = await getTokenFromLocalStorage();
    timeSheetServices.setToken(token);
    await timeSheetServices.remove(TimeSheetId);
    dispatch(deleteTimeSheet(TimeSheetId));
  };
};

export default timeSheetSlice.reducer;
